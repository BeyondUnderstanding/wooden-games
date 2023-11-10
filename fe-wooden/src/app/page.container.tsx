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
import { ChosenDate } from './ui-kit/layout/layout.component';
import { Stream } from '@most/types';

export type PageContainerProps = {
    readonly basketProducts: Array<Product>;
    readonly products: Array<Product>;
    readonly occupiedDates: Array<Date>;
};

interface PageProps {
    readonly basketProducts: Property<Array<Product>>;
    readonly products: Array<Product>;
    readonly setBasketProducts: (x: Array<Product>) => void;
    readonly add2Basket: (x: Product) => void;
    readonly deleteFromBasket: (id: number) => void;
    readonly updateDate: (date: ChosenDate) => Stream<unknown>;
    readonly occupiedDates: Array<Date>;
}
const Page = ({
    basketProducts,
    products,
    setBasketProducts,
    add2Basket,
    deleteFromBasket,
    updateDate,
    occupiedDates,
}: PageProps) => {
    return (
        <LayoutContainer
            products={basketProducts}
            deleteDromBasket={deleteFromBasket}
            updateDate={updateDate}
            setBasketProducts={setBasketProducts}
            occupiedDates={occupiedDates}
        >
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
