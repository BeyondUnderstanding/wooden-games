import { Header } from '../header/header.component';
import { Page, SidePopup } from '../side-popup/side-popup.component';
import { useState } from 'react';
import { useMergeState } from '../../../utils/hooks';
import { productsBasket } from '../side-popup/popup.mock';
import { newLensedAtom } from '@frp-ts/lens';

export const Layout = () => {
    const [page, setPage] = useMergeState<Page>({ url: 'basket' });
    const [isOpen, setIsOpen] = useState(false);

    const openBasket = () => {
        setIsOpen(true);
        setPage({
            url: 'basket',
            products: productsBasket,
        });
    };

    const chosenDate = newLensedAtom(
        page.url !== 'basket' ? 'Lease date not specified' : 'Any Date'
    );

    return (
        <>
            <SidePopup
                page={page}
                setNewPage={(page) => setPage(page)}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                chosenDate={chosenDate}
                setChosenDate={(x) => chosenDate.set(x)}
            />
            <Header
                openBasket={openBasket}
                basketAmount={1}
                chosenDate={chosenDate}
                setChosenDate={(x) => chosenDate.set(x)}
            />
        </>
    );
};
