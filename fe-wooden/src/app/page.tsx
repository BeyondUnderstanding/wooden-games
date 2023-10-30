// 'use client';

import { Layout } from './ui-kit/layout/layout.component';
import { Products } from './ui-kit/products/products.component';
// MOCK
import { productsBasket } from './ui-kit/side-popup/popup.mock';
import src from '../app/ui-kit/busket-product-card/images/zigzag.png';

export default function Home() {
    const argsForProducts = {
        products: productsBasket.map((el) => ({ ...el, src })),
    };
    return (
        <Layout>
            <Products {...argsForProducts} />
        </Layout>
    );
}
