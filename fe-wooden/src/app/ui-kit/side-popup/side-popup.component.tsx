'use client';

import { constVoid } from 'fp-ts/lib/function';
import { TextSidePopup } from './text-side-popup.component';
import { EmptyBasketPopup } from './empty-basket-popup.component';
import { CheckOutPopup } from './check-out-popup.component';
import { BasketPopup, Product } from './basket-popup.component';
import { RentalRulsBody } from '../retntal-ruls/retntal-ruls.component';
import { Property } from '@frp-ts/core';
import { ChosenDate } from '../layout/layout.component';

export interface SidePopupLayoutProps {
    readonly children: React.ReactNode;
    readonly label?: string;
    readonly labelButton: string;
    readonly isOpen: boolean;
    readonly onClose: () => void;
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
    readonly isOpen: boolean;
    readonly page: Page;
    readonly onClose: () => void;
    readonly setNewPage: (args: Partial<Page>) => void;
}

export const SidePopup = ({
    isOpen,
    page,
    onClose,
    setNewPage,
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

    const remoweFromBacket = (id: number) => {
        setNewPage({ products: page.products?.filter((p) => p.id !== id) });
    };
    switch (page.url) {
        case 'empty':
            return (
                <EmptyBasketPopup
                    isOpen={isOpen}
                    label="Your Cart"
                    onClose={onClose}
                    labelButton="Start Shopping"
                    onClickButton={constVoid}
                />
            );
        case 'checkout':
            return (
                <CheckOutPopup
                    isOpen={isOpen}
                    label={'Rental rules'}
                    onClose={onClose}
                    labelButton={'It makes sense to me'}
                    onClickButton={constVoid}
                    onClickBack={onClickBack}
                    goToRulse={goFromCheckRulseToCheckout}
                />
            );
        case 'basket':
            return (
                <BasketPopup
                    isOpen={isOpen}
                    onClose={onClose}
                    goToCheckRulse={goToCheckRulse}
                    onClick={goToCheckOut}
                    products={page.products ?? []}
                    onProductDelete={remoweFromBacket}
                    setChosenDate={page.setChosenDate}
                    chosenDate={page.chosenDate}
                />
            );
        case 'text':
            return (
                <TextSidePopup
                    isOpen={isOpen}
                    label={page.label}
                    onClose={onClose}
                    labelButton={'It makes sense to me'}
                    onClickButton={constVoid}
                    content={page.content}
                    onClickBack={onClickBack}
                />
            );
    }
};
