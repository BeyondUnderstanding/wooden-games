'use client';

import { Header } from '../header/header.component';
import { Page, SidePopup } from '../side-popup/side-popup.component';
import { useState } from 'react';
import { useMergeState } from '../../../utils/hooks';
import { productsBasket } from '../side-popup/popup.mock';
import { newLensedAtom } from '@frp-ts/lens';
import { Footer } from '../footer/footer.component';

export interface PropsChildComponent {}

export type LayoutProps = {
    readonly children?: React.ReactNode;
    readonly childrenComponent?: (p: PropsChildComponent) => JSX.Element;
} & (
    | { children: React.ReactNode }
    | {
          childrenComponent: (p: PropsChildComponent) => JSX.Element;
      }
);

export const Layout = ({ children, childrenComponent }: LayoutProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const chosenDate = newLensedAtom(
        isOpen ? 'Lease date not specified' : 'Any Date'
    );
    const [page, setPage] = useMergeState<Page>({
        url: 'basket',
        chosenDate: chosenDate,
        setChosenDate: (x) => chosenDate.set(x),
    });

    const openBasket = () => {
        setIsOpen(true);
        setPage({
            url: 'basket',
            products: productsBasket,
        });
    };

    const ChildrenComponent = childrenComponent && childrenComponent({});

    return (
        <>
            <SidePopup
                page={page}
                setNewPage={(page) => setPage(page)}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <Header
                openBasket={openBasket}
                basketAmount={productsBasket.length}
                chosenDate={chosenDate}
                setChosenDate={(x) => {
                    chosenDate.set(x);
                }}
            />
            <main>
                {children}
                {ChildrenComponent && ChildrenComponent}
            </main>
            <Footer />
        </>
    );
};
