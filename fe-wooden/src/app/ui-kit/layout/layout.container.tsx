'use client';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import React from 'react';
import { useProperties } from '@frp-ts/react';
import Layout, {
    ChosenDate,
    PropsChildComponent,
} from '../layout/layout.component';
import { Product } from '../side-popup/basket-popup.component';
import { newLayoutViewModel } from './layout.view-model';
import { Property } from '@frp-ts/core';
import { Stream } from '@most/types';

export type LayoutContainerProps = {
    readonly products: Property<Array<Product>>;
    readonly deleteDromBasket: (id: number) => void;
    readonly children?: React.ReactNode;
    readonly childrenComponent?: (p: PropsChildComponent) => JSX.Element;
    readonly updateDate: (date: ChosenDate) => Stream<unknown>;
    readonly setBasketProducts: (x: Array<Product>) => void;
} & (
    | { children: React.ReactNode }
    | {
          childrenComponent: (p: PropsChildComponent) => JSX.Element;
      }
);
export const LayoutContainer = ({ ...props }: LayoutContainerProps) => {
    const vm = useValueWithEffect(() => newLayoutViewModel(props), []);

    const [isOpen, page, basketAmount, formData] = useProperties(
        vm.isOpen,
        vm.page,
        vm.basketAmount,
        vm.checkoutForm
    );

    return React.createElement(Layout, {
        ...props,
        ...vm,
        isOpen,
        page,
        basketAmount,
        formData,
    });
};
