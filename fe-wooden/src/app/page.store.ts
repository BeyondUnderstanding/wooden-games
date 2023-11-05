import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { Product } from './ui-kit/side-popup/basket-popup.component';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../utils/run-view-model.utils';
import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';
import { createAdapter } from '@most/adapter';
import { restService } from './service/global-action.service';

interface HomePageStore {
    readonly basketProducts: Property<Array<Product>>;
    readonly products: Property<Array<Product>>;
    readonly setProducts: (x: Array<Product>) => void;
    readonly add2Basket: (x: Product) => void;
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

    return valueWithEffect.new(
        {
            basketProducts: basketProductsS,
            products: productsS,
            setProducts: (x: Array<Product>) => basketProductsS.set(x),
            add2Basket: setProduct,
        },
        add2BasketEffect
    );
};
