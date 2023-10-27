import { Header } from '../header/header.component';
import { Page, SidePopup } from '../side-popup/side-popup.component';
import { useState } from 'react';
import { useMergeState } from '../../../utils/hooks';

export const Layout = () => {
    const [page, setPage] = useMergeState<Page>({ url: 'basket' });
    const [isOpen, setIsOpen] = useState(false);

    const openBasket = () => {
        setIsOpen(true);
        setPage({
            url: 'basket',
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
            <Header openBasket={openBasket} basketAmount={1} />
        </>
    );
};
