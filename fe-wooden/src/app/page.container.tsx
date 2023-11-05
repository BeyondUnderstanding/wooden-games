'use client';
import React from 'react';
import { useProperties } from '@frp-ts/react';
import { newHomePageStore } from './page.store';
import { Product } from './ui-kit/side-popup/basket-popup.component';
import { useValueWithEffect } from '../utils/run-view-model.utils';
import { LayoutContainer } from './ui-kit/layout/layout.container';
import { MainSection } from './ui-kit/main-section/main-section.component';
import { Products } from './ui-kit/products/products.component';
import { ShortInformation } from './ui-kit/short-information-section/short-information-section.component';
import { Property } from '@frp-ts/core';

export type PageContainerProps = {
    // readonly basketProducts: Array<Product>;
    readonly products: Array<Product>;
};

interface PageProps {
    readonly basketProducts: Property<Array<Product>>;
    readonly products: Array<Product>;
    readonly setProducts: (x: Array<Product>) => void;
    readonly add2Basket: (x: Product) => void;
}
const Page = ({
    basketProducts,
    products,
    setProducts,
    add2Basket,
}: PageProps) => {
    return (
        <LayoutContainer products={basketProducts}>
            <MainSection />
            <Products products={products} add2Basket={add2Basket} />
            <ShortInformation />
        </LayoutContainer>
    );
};

export const PageContainer = ({ ...props }: PageContainerProps) => {
    const store = useValueWithEffect(() => newHomePageStore(props), []);

    const [products] = useProperties(store.products);

    return React.createElement(Page, {
        ...props,
        ...store,
        products,
    });
};
