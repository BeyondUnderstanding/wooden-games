import { Header } from '../header/header.component';
import { Page, SidePopup } from '../side-popup/side-popup.component';
import { useState } from 'react';
import { useMergeState } from '../../../utils/hooks';
import { productsBasket } from '../side-popup/popup.mock';
import { newLensedAtom } from '@frp-ts/lens';

export const Layout = () => {
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
        </>
    );
};
