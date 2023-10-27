import { constVoid } from 'fp-ts/lib/function';
import { TextSidePopup } from './text-side-popup.component';
import { EmptyBasketPopup } from './empty-basket-popup.component';
import { CheckOutPopup } from './check-out-popup.component';
import { BasketPopup } from './basket-popup.component';
import { productsBasket } from './popup.mock';

export interface SidePopupLayoutProps {
    readonly children: React.ReactNode;
    readonly label?: string;
    readonly labelButton: string;
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onClickButton: () => void;
}

type url = 'empty' | 'basket' | 'checkout' | 'text';

export interface Page {
    readonly url: url;
    readonly content?: JSX.Element | Array<JSX.Element>;
    readonly label?: string;
    readonly subUrl?: url;
}

export interface SidePopupProps {
    readonly isOpen: boolean;
    readonly page: Page;
    readonly onClose: () => void;
    readonly setNewPage: (args: Page) => void;
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
            content: [
                <p key={''}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut
                    repellendus fugit expedita at! Modi quo, id ratione expedita
                    a, ullam, quos quibusdam ea sint et cupiditate aliquid
                    maxime odit eligendi.
                </p>,
                <p key={''}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut
                    repellendus fugit expedita at! Modi quo, id ratione expedita
                    a, ullam, quos quibusdam ea sint et cupiditate aliquid
                    maxime odit eligendi.
                </p>,
            ],
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
            ...page,
            url: page.subUrl ?? 'basket',
            subUrl: undefined,
        });

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
                />
            );
        case 'basket':
            return (
                <BasketPopup
                    isOpen={isOpen}
                    onClose={onClose}
                    goToCheckRulse={goToCheckRulse}
                    onClick={goToCheckOut}
                    products={productsBasket}
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
