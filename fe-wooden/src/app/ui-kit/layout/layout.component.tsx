'use client';

import { Header } from '../header/header.component';
import { Page, SidePopup } from '../side-popup/side-popup.component';
import { Footer } from '../footer/footer.component';
import { Property } from '@frp-ts/core';
import { useUUID } from '../../../utils/cookie.utils';

export interface PropsChildComponent {}

export type LayoutProps = {
    readonly children?: React.ReactNode;
    readonly childrenComponent?: (p: PropsChildComponent) => JSX.Element;
    readonly isOpen: boolean;
    readonly chosenDate: Property<ChosenDate>;
    readonly page: Page;
    readonly basketAmount: number;
    readonly setChosenDate: (x: ChosenDate) => void;
    readonly setIsOpen: (x: boolean) => void;
    readonly setPage: (page: Partial<Page>) => void;
    readonly openBasket: () => void;
    readonly deleteDromBasket: (id: number) => void;
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
            />
            <Header
                openBasket={openBasket}
                basketAmount={basketAmount}
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
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
