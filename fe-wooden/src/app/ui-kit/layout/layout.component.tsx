'use client';

import { Header } from '../header/header.component';
import { Page, SidePopup } from '../side-popup/side-popup.component';
import { Footer } from '../footer/footer.component';
import { Property } from '@frp-ts/core';
import { useUUID } from '../../../utils/cookie.utils';
import { FormData } from '../side-popup/check-out-popup.component';
import { Stream } from '@most/types';
import { RentalRulsBody } from '../retntal-ruls/retntal-ruls.component';
import { GeneralConditionsBody } from '../general-conditions/general-conditions.component';

export interface PropsChildComponent {
    readonly chosenDate: Property<ChosenDate>;
    readonly setChosenDate: (x: ChosenDate) => void;
    readonly goToCheckRulse: () => void;
}

export type LayoutProps = {
    readonly children?: React.ReactNode;
    readonly childrenComponent?: (p: PropsChildComponent) => JSX.Element;
    readonly isOpen: boolean;
    readonly chosenDate: Property<ChosenDate>;
    readonly page: Page;
    readonly basketAmount: number;
    readonly formData: FormData;
    readonly updateFormData: (data: Partial<FormData>) => void;
    readonly setChosenDate: (x: ChosenDate) => void;
    readonly setIsOpen: (x: boolean) => void;
    readonly setPage: (page: Partial<Page>) => void;
    readonly openBasket: () => void;
    readonly deleteDromBasket: (id: number) => void;
    readonly updateDate: (date: ChosenDate) => Stream<unknown>;
    readonly checkoutOnClick: (
        typePayment: 'cryptocom' | 'prepayment' | 'paypal'
    ) => void;
    readonly occupiedDates: Array<Date>;
} & (
    | { children: React.ReactNode }
    | {
          childrenComponent: (p: PropsChildComponent) => JSX.Element;
      }
);

export interface ChosenDate {
    label: string | undefined;
    start: Date;
    end: Date;
}

export const Layout = ({
    children,
    childrenComponent,
    isOpen,
    chosenDate,
    page,
    setIsOpen,
    setPage,
    openBasket,
    setChosenDate,
    basketAmount,
    deleteDromBasket,
    formData,
    updateFormData,
    updateDate,
    checkoutOnClick,
    occupiedDates,
}: LayoutProps) => {
    useUUID();

    const goFromCheckRulseToCheckout = () => {
        setIsOpen(true);
        setPage({
            url: 'text',
            label: 'Rental rules',
            subUrl: 'checkout',
            content: <RentalRulsBody />,
        });
    };

    const termsConditionsOpen = () => {
        setIsOpen(true);
        setPage({
            url: 'text',
            label: 'Rental rules',
            subUrl: 'checkout',
            content: <GeneralConditionsBody />,
        });
    };

    const ChildrenComponent =
        childrenComponent &&
        childrenComponent({
            chosenDate,
            setChosenDate,
            goToCheckRulse: goFromCheckRulseToCheckout,
        });

    return (
        <>
            <SidePopup
                page={page}
                setNewPage={(page) => setPage(page)}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                deleteFromBasket={deleteDromBasket}
                formData={formData}
                updateFormData={updateFormData}
                updateDate={updateDate}
                checkoutOnClick={checkoutOnClick}
                occupiedDates={occupiedDates}
            />
            <Header
                openBasket={openBasket}
                basketAmount={basketAmount}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
                updateDate={updateDate}
                occupiedDates={occupiedDates}
                openRentalRuls={goFromCheckRulseToCheckout}
            />
            <main>
                {ChildrenComponent && ChildrenComponent}
                {children}
            </main>
            <Footer termsConditionsOpen={termsConditionsOpen} />
        </>
    );
};
export default Layout;
