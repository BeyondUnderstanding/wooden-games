import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { Product } from './ui-kit/side-popup/basket-popup.component';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../utils/run-view-model.utils';
import { pipe } from 'fp-ts/lib/function';
import { chain, debounce, fromPromise, tap } from '@most/core';
import { createAdapter } from '@most/adapter';
import { restService } from './service/global-action.service';
import { ChosenDate } from './ui-kit/layout/layout.component';
import { Stream } from '@most/types';
import { getCookie } from 'cookies-next';

interface HomePageStore {
    readonly basketProducts: Property<Array<Product>>;
    readonly products: Property<Array<Product>>;
    readonly setProducts: (x: Array<Product>) => void;
    readonly add2Basket: (x: Product) => void;
    readonly deleteFromBasket: (id: number) => void;
    readonly updateDate: (date: ChosenDate) => Stream<unknown>;
}

interface NewCalendarStoreProperty {
    readonly basketProducts: Array<Product>;
    readonly products: Array<Product>;
}

type NewHomePageStore = (
    props: NewCalendarStoreProperty
) => ValueWithEffect<HomePageStore>;

export const newHomePageStore: NewHomePageStore = ({
    basketProducts,
    products,
}) => {
    const service = restService();

    const basketProductsS = newLensedAtom<Array<Product>>(basketProducts);
    const productsS = newLensedAtom(products);

    const [setProduct, productEffect] = createAdapter<Product>();

    const add2BasketEffect = pipe(
        productEffect,
        tap(async (product) => {
            const resp = await service.addBasketItem({ id: product.id });
            if (resp.status === 200) {
                basketProductsS.set([...basketProductsS.get(), product]);
            }
        })
    );

    const deleteFromBasket = async (product: number) => {
        const resp = await service.delFromBasket(product);
        if (resp === 200) {
            basketProductsS.set(
                basketProductsS.get().filter((x) => x.id !== product)
            );
        }
    };

    const updateDate = (date: ChosenDate): Stream<Array<Product>> =>
        pipe(
            service.updateDate({
                start_date: date.start.toISOString(),
                end_date: date.end.toISOString(),
            }),
            chain((_) => fromPromise(service.getBasket(getCookie('x-uuid')))),
            tap((x) => basketProductsS.set(x)),
            debounce(3)
        );

    return valueWithEffect.new(
        {
            basketProducts: basketProductsS,
            products: productsS,
            setProducts: (x: Array<Product>) => basketProductsS.set(x),
            add2Basket: setProduct,
            deleteFromBasket,
            updateDate,
        },
        add2BasketEffect
    );
};
