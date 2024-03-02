'use client';

import { TextSidePopup } from './text-side-popup.component';
import { EmptyBasketPopup } from './empty-basket-popup.component';
import { CheckOutPopup, FormData } from './check-out-popup.component';
import { BasketPopup, Product } from './basket-popup.component';
import { RentalRulsBody } from '../retntal-ruls/retntal-ruls.component';
import { Property } from '@frp-ts/core';
import { ChosenDate } from '../layout/layout.component';
import { injectable } from '@injectable-ts/core';
import { PaymentTypes } from '../../service/global-action.service';

export interface SidePopupLayoutProps {
    readonly children: React.ReactNode;
    readonly label?: string;
    readonly labelButton: string;
    readonly onClickButton: () => void;
}

type url = 'empty' | 'basket' | 'checkout' | 'text';

// не разу не типобизопасно
export interface Page {
    readonly url: url;
    readonly content?: JSX.Element;
    readonly label?: string;
    readonly subUrl?: url;
    readonly products?: Array<Product>;
    readonly chosenDate: Property<ChosenDate>;
    readonly setChosenDate: (x: ChosenDate) => void;
}

export interface SidePopupProps {
    readonly page: Page;
    readonly deleteFromBasket: (id: number) => void;
    readonly setNewPage: (args: Partial<Page>) => void;
    readonly formData: FormData;
    readonly updateFormData: (data: Partial<FormData>) => void;
    readonly checkoutOnClick: (typePayment: PaymentTypes) => void;
}

export interface PopupProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

export const SidePopup = injectable(
    BasketPopup,
    TextSidePopup,
    CheckOutPopup,
    EmptyBasketPopup,
    (
        BasketPopupContainer,
        TextSidePopupContainer,
        CheckOutPopupContainer,
        EmptyBasketPopupContainer
    ) =>
        ({
            page,
            setNewPage,
            deleteFromBasket,
            formData,
            updateFormData,
            checkoutOnClick,
        }: SidePopupProps) => {
            const goToCheckRulse = () => {
                setNewPage({
                    url: 'text',
                    label: 'Rental rules',
                    subUrl: 'basket',
                    content: <RentalRulsBody />,
                });
            };

            const goFromCheckRulseToCheckout = () => {
                setNewPage({
                    url: 'text',
                    label: 'Rental rules',
                    subUrl: 'checkout',
                    content: <RentalRulsBody />,
                });
            };

            const goToCheckOut = () => {
                setNewPage({
                    url: 'checkout',
                    subUrl: 'basket',
                });
            };

            const onClickBack = () =>
                setNewPage({
                    url: page.subUrl ?? 'basket',
                    subUrl: undefined,
                });

            switch (page.url) {
                case 'empty':
                    return (
                        <EmptyBasketPopupContainer
                            label="Your Cart"
                            labelButton="Start Shopping"
                        />
                    );
                case 'checkout':
                    return (
                        <CheckOutPopupContainer
                            label={'Checkout'}
                            onClickButton={checkoutOnClick}
                            onClickBack={onClickBack}
                            goToRulse={goFromCheckRulseToCheckout}
                            formData={formData}
                            updateFormData={updateFormData}
                        />
                    );
                case 'basket':
                    return (
                        <BasketPopupContainer
                            goToCheckRulse={goToCheckRulse}
                            onClick={goToCheckOut}
                            products={page.products ?? []}
                            onProductDelete={deleteFromBasket}
                            chosenDate={page.chosenDate}
                        />
                    );
                case 'text':
                    return (
                        <TextSidePopupContainer
                            label={page.label}
                            labelButton={'It makes sense to me'}
                            content={page.content}
                            onClickBack={onClickBack}
                        />
                    );
            }
        }
);
