'use client';
import React from 'react';
import { useProperties } from '@frp-ts/react';

import { Stream } from '@most/types';
import { PaymentStatusesFail } from './payment-statuses-fail.component';
import { Property } from '@frp-ts/core';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { newHomePageStore } from '../../page.store';
import { ChosenDate } from '../../ui-kit/layout/layout.component';
import { LayoutContainer } from '../../ui-kit/layout/layout.container';
import { Product } from '../../ui-kit/side-popup/basket-popup.component';

export type FaqPageContainerProps = {
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
const PageFaq = ({
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
            <PaymentStatusesFail />
        </LayoutContainer>
    );
};

export const PaymentStatusesFailPageContainer = ({
    ...props
}: FaqPageContainerProps) => {
    const store = useValueWithEffect(() => newHomePageStore(props), []);

    const [products] = useProperties(store.products);

    return React.createElement(PageFaq, {
        ...props,
        ...store,
        products,
    });
};
