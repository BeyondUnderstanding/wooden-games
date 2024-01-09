'use client';
import React from 'react';

import { Stream } from '@most/types';
import { Property } from '@frp-ts/core';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { newHomePageStore } from '../../page.store';
import {
    ChosenDate,
    PropsChildComponent,
} from '../../ui-kit/layout/layout.component';
import { LayoutContainer } from '../../ui-kit/layout/layout.container';
import { Product } from '../../ui-kit/side-popup/basket-popup.component';
import {
    ProductInfoPage,
    ProductInfoPageProps,
} from '../../ui-kit/product-info-page/product-info-page.component';
import { ProductGalery } from '../../ui-kit/product-galery/product-galery.component';
import { ProductFratured } from '../../ui-kit/product-fratured/product-fratured.component';

export type PageContainerProps = {
    readonly basketProducts: Array<Product>;
    readonly products: Array<Product>;
    readonly occupiedDates: Array<Date>;
    readonly productData: ProductInfoPageProps['productData'];
    readonly imgs: Array<string>;
    readonly fratured: ReadonlyArray<Product>;
};

interface PageProps {
    readonly basketProducts: Property<Array<Product>>;
    readonly setBasketProducts: (x: Array<Product>) => void;
    readonly add2Basket: (x: Product) => void;
    readonly deleteFromBasket: (id: number) => void;
    readonly updateDate: (date: ChosenDate) => Stream<unknown>;
    readonly occupiedDates: Array<Date>;
    readonly productData: ProductInfoPageProps['productData'];
    readonly imgs: Array<string>;
    readonly fratured: ReadonlyArray<Product>;
}
const Page = ({
    basketProducts,
    setBasketProducts,
    add2Basket,
    deleteFromBasket,
    updateDate,
    occupiedDates,
    productData,
    imgs,
    fratured,
}: PageProps) => {
    const calendarData = {
        label: 'Choose Dates',
        unsetLabel: 'Any Date',
        updateDate,
        occupiedDates,
    };

    const ProductInfoPageResolve = (rest: PropsChildComponent) =>
        ProductInfoPage({
            calendarData: {
                ...calendarData,
                ...rest,
                isBasket: true,
                label: 'Enter the date',
                unsetLabel: 'Lease date not specified',
            },
        });

    return (
        <LayoutContainer
            products={basketProducts}
            deleteDromBasket={deleteFromBasket}
            updateDate={updateDate}
            setBasketProducts={setBasketProducts}
            occupiedDates={occupiedDates}
            childrenComponent={(restProps) =>
                ProductInfoPageResolve(restProps)({
                    ...restProps,
                    productData,
                    add2Basket,
                    imgs,
                })
            }
        >
            <ProductGalery imgs={imgs} />
            <ProductFratured add2Basket={add2Basket} fratured={fratured} />
        </LayoutContainer>
    );
};

export const GameContainer = ({ ...props }: PageContainerProps) => {
    const store = useValueWithEffect(() => newHomePageStore(props), []);

    return React.createElement(Page, {
        ...props,
        ...store,
    });
};
