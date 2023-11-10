'use client';

import { Header } from '../header/header.component';
import { Page, SidePopup } from '../side-popup/side-popup.component';
import { Footer } from '../footer/footer.component';
import { Property } from '@frp-ts/core';
import { useUUID } from '../../../utils/cookie.utils';
import { FormData } from '../side-popup/check-out-popup.component';
import { Stream } from '@most/types';

export interface PropsChildComponent {}

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
    readonly checkoutOnClick: () => void;
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
    const ChildrenComponent = childrenComponent && childrenComponent({});

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
            />
            <main>
                {children}
                {ChildrenComponent && ChildrenComponent}
            </main>
            <Footer />
        </>
    );
};
export default Layout;
