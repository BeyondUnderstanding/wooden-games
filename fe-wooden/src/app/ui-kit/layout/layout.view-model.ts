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
import { chain, empty, tap } from '@most/core';
import { FormData } from '../side-popup/check-out-popup.component';
import { createAdapter } from '@most/adapter';
import { restService } from '../../service/global-action.service';

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
    readonly checkoutOnClick: (typePayment: 'card' | 'prepayment') => void;
}

interface NewCalendarViewModelProperty {
    readonly products: Property<Array<Product>>;
    readonly setBasketProducts: (x: Array<Product>) => void;
}

type NewLayoutViewModel = (
    props: NewCalendarViewModelProperty
) => ValueWithEffect<LayoutViewModel>;

export const newLayoutViewModel: NewLayoutViewModel = ({
    products,
    setBasketProducts,
}) => {
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
        name: { data: undefined, isValid: true },
        passport: { data: undefined, isValid: true },
        email: { data: undefined, isValid: true },
        phone: { data: undefined, isValid: true },
        deliveryAddress: { data: undefined, isValid: true },
        comment: { data: undefined, isValid: true },
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
    const [checkoutOnClick, checkoutEvent] = createAdapter<
        'card' | 'prepayment'
    >();

    const checkoutEffect = pipe(
        checkoutEvent,
        chain((typePayment) => {
            const form = checkoutForm.get();

            if (form.phone.data && !/^\+995[57]\d{8}$/.test(form.phone.data)) {
                checkoutForm.modify((form) => ({
                    ...form,
                    phone: { ...form.phone, isValid: false },
                }));
            } else {
                checkoutForm.modify((form) => ({
                    ...form,
                    phone: { ...form.phone, isValid: true },
                }));
            }
            if (
                form.email.data &&
                !/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(
                    form.email.data
                )
            ) {
                checkoutForm.modify((form) => ({
                    ...form,
                    email: { ...form.email, isValid: false },
                }));
            } else {
                checkoutForm.modify((form) => ({
                    ...form,
                    email: { ...form.email, isValid: true },
                }));
            }
            if (!!form.passport.data && !/^\d{11}$/.test(form.passport.data)) {
                checkoutForm.modify((form) => ({
                    ...form,
                    passport: { ...form.passport, isValid: false },
                }));
            } else {
                checkoutForm.modify((form) => ({
                    ...form,
                    passport: { ...form.passport, isValid: true },
                }));
            }
            if (form.name.data && form.name.data.length < 3) {
                checkoutForm.modify((form) => ({
                    ...form,
                    name: { ...form.name, isValid: false },
                }));
            } else {
                checkoutForm.modify((form) => ({
                    ...form,
                    name: { ...form.name, isValid: true },
                }));
            }
            if (
                form.deliveryAddress.data &&
                form.deliveryAddress.data.length > 10
            ) {
                checkoutForm.modify((form) => ({
                    ...form,
                    deliveryAddress: { ...form.deliveryAddress, isValid: true },
                }));
            } else {
                checkoutForm.modify((form) => ({
                    ...form,
                    deliveryAddress: {
                        ...form.deliveryAddress,
                        isValid: false,
                    },
                }));
            }

            if (
                checkoutForm.get().name.isValid &&
                checkoutForm.get().email.isValid &&
                checkoutForm.get().passport.isValid &&
                checkoutForm.get().phone.isValid &&
                checkoutForm.get().deliveryAddress.isValid
            ) {
                return restService().createOrder(
                    checkoutForm.get(),
                    typePayment
                );
            } else {
                return empty();
            }
        }),
        tap((resp) => {
            if (resp.status === 200) {
                setPage({ url: 'empty', products: [] });
                setBasketProducts([]);
                if (resp.data.checkout_url !== null) {
                    window.open(resp.data.checkout_url);
                }
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
            checkoutOnClick,
        },
        basketProductsAmountEffect,
        basketProductsEffect,
        // validateFormEffect,
        checkoutEffect
    );
};
