'use client';
import React from 'react';
import { useProperties } from '@frp-ts/react';
import { newHomePageStore } from '../page.store';
import { Product } from '../ui-kit/side-popup/basket-popup.component';
import { useValueWithEffect } from '../../utils/run-view-model.utils';
import { LayoutContainer } from '../ui-kit/layout/layout.container';
import { Property } from '@frp-ts/core';
import { ChosenDate } from '../ui-kit/layout/layout.component';
import { Stream } from '@most/types';
import { AboutUsMain } from '../ui-kit/about-us-main/about-us-main.component';
import AboutUsAside from '../ui-kit/about-us-aside/about-us-aside.component';

export type AboutUsPageContainerProps = {
    readonly basketProducts: Array<Product>;
    readonly products: Array<Product>;
    readonly occupiedDates: Array<Date>;
};

interface PageProps {
    readonly basketProducts: Property<Array<Product>>;
    readonly products: Array<Product>;
    readonly setBasketProducts: (x: Array<Product>) => void;
    readonly deleteFromBasket: (id: number) => void;
    readonly updateDate: (date: ChosenDate) => Stream<unknown>;
    readonly occupiedDates: Array<Date>;
}
const PageAboutUS = ({
    basketProducts,
    setBasketProducts,
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
            <AboutUsMain />
            <AboutUsAside />
        </LayoutContainer>
    );
};

export const AboutUsPageContainer = ({
    ...props
}: AboutUsPageContainerProps) => {
    const store = useValueWithEffect(() => newHomePageStore(props), []);

    const [products] = useProperties(store.products);

    return React.createElement(PageAboutUS, {
        ...props,
        ...store,
        products,
    });
};
