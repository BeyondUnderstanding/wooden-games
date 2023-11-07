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
import { FormData } from '../side-popup/check-out-popup.component';

interface LayoutViewModel {
    readonly isOpen: Property<boolean>;
    readonly chosenDate: Property<ChosenDate>;
    readonly page: Property<Page>;
    readonly basketAmount: Property<number>;
    readonly checkoutForm: Property<FormData>;
    readonly updateFormData: (data: Partial<FormData>) => void;
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
        products: products.get(),
    });

    const checkoutForm = newLensedAtom<FormData>({
        name: { data: undefined, isValid: false },
        passport: { data: undefined, isValid: false },
        email: { data: undefined, isValid: false },
        phone: { data: undefined, isValid: false },
    });

    const updateFormData = (data: Partial<FormData>) =>
        checkoutForm.modify((x) => ({ ...x, ...data }));

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

    const basketProductsEffect = pipe(
        products,
        fromProperty,
        tap((products) => {
            if (products.length > 0) {
                setPage({ products });
            } else {
                setPage({
                    url: 'empty',
                    products,
                });
            }
        })
    );

    // смотрит на изменение полей формы checkout и выставляет их валидными елси соответствует условиям
    const validateFormEffect = pipe(
        checkoutForm,
        fromProperty,
        tap((form) => {
            if (
                form.phone.data &&
                /^\+995[57]\d{8}$/.test(form.phone.data) &&
                !form.phone.isValid
            ) {
                checkoutForm.modify((form) => ({
                    ...form,
                    phone: { ...form.phone, isValid: true },
                }));
            }
            if (
                form.email.data &&
                /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(
                    form.email.data
                ) &&
                !form.email.isValid
            ) {
                checkoutForm.modify((form) => ({
                    ...form,
                    email: { ...form.email, isValid: true },
                }));
            }
            if (
                form.passport.data &&
                /^\d{11}$/.test(form.passport.data) &&
                !form.passport.isValid
            ) {
                checkoutForm.modify((form) => ({
                    ...form,
                    passport: { ...form.passport, isValid: true },
                }));
            }
            if (
                form.name.data &&
                form.name.data.length > 3 &&
                !form.name.isValid
            ) {
                checkoutForm.modify((form) => ({
                    ...form,
                    name: { ...form.name, isValid: true },
                }));
            }
        })
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
            checkoutForm,
            updateFormData,
        },
        basketProductsAmountEffect,
        basketProductsEffect,
        validateFormEffect
    );
};
