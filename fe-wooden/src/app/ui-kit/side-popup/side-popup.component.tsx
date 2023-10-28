import { constVoid } from 'fp-ts/lib/function';
import { TextSidePopup } from './text-side-popup.component';
import { EmptyBasketPopup } from './empty-basket-popup.component';
import { CheckOutPopup } from './check-out-popup.component';
import { BasketPopup, ProductBasket } from './basket-popup.component';
import { RentalRulsBody } from '../retntal-ruls/retntal-ruls.component';

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
    readonly products?: Array<ProductBasket>;
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

    const remoweFromBacket = (id: string) => {
        console.log(id);
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
