import { Property } from '@frp-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { Page } from '../side-popup/side-popup.component';
import { Product } from '../side-popup/basket-popup.component';
import { ChosenDate } from './layout.component';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '../../../utils/property.utils';
import { tap } from '@most/core';

interface LayoutViewModel {
    readonly isOpen: Property<boolean>;
    readonly chosenDate: Property<ChosenDate>;
    readonly page: Property<Page>;
    readonly basketAmount: Property<number>;
    readonly setChosenDate: (x: ChosenDate) => void;
    readonly setIsOpen: (x: boolean) => void;
    readonly setPage: (page: Partial<Page>) => void;
    readonly openBasket: () => void;
}

interface NewCalendarViewModelProperty {
    readonly products: Property<Array<Product>>;
}

type NewLayoutViewModel = (
    props: NewCalendarViewModelProperty
) => ValueWithEffect<LayoutViewModel>;

export const newLayoutViewModel: NewLayoutViewModel = ({ products }) => {
    const isOpen = newLensedAtom(false);
    const setIsOpen = (x: boolean) => isOpen.set(x);

    // const basketProducts = newLensedAtom<Array<Product>>(products);
    const basketAmount = newLensedAtom<number>(products.get().length);

    const chosenDate = newLensedAtom<ChosenDate>({
        label: undefined,
        start: new Date(),
        end: new Date(),
    });
    const setChosenDate = (x: ChosenDate) => chosenDate.set(x);

    const page = newLensedAtom<Page>({
        url: 'basket',
        chosenDate: chosenDate,
        setChosenDate: (x) => chosenDate.set(x),
    });
    const setPage = (newPage: Partial<Page>) =>
        page.modify((page) => ({ ...page, ...newPage }));

    const openBasket = () => {
        setIsOpen(true);
        if (products.get().length > 0) {
            setPage({
                url: 'basket',
                products: products.get(),
            });
        } else {
            setPage({
                url: 'empty',
            });
        }
    };

    const basketProductsAmountEffect = pipe(
        products,
        fromProperty,
        tap((products) => basketAmount.set(products.length))
    );

    return valueWithEffect.new(
        {
            isOpen,
            chosenDate,
            page,
            setIsOpen,
            setPage,
            openBasket,
            setChosenDate,
            basketAmount,
        },
        basketProductsAmountEffect
    );
};
