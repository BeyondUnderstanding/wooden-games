import { Header } from '../header/header.component';
import { Page, SidePopup } from '../side-popup/side-popup.component';
import { useState } from 'react';
import { useMergeState } from '../../../utils/hooks';
import { productsBasket } from '../side-popup/popup.mock';

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

    const remoweFromBacket = (id: string) =>
        setPage({ products: page.products?.filter((p) => p.id === id) });
    return (
        <>
            <SidePopup
                page={page}
                setNewPage={(page) => setPage(page)}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <Header openBasket={openBasket} basketAmount={1} />
        </>
    );
};
