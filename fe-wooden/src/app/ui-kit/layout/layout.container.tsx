'use client';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import React from 'react';
import { useProperties } from '@frp-ts/react';
import Layout, { PropsChildComponent } from '../layout/layout.component';
import { Product } from '../side-popup/basket-popup.component';
import { newLayoutViewModel } from './layout.view-model';
import { Property } from '@frp-ts/core';

export type LayoutContainerProps = {
    readonly products: Property<Array<Product>>;
    readonly deleteDromBasket: (id: number) => void;
    readonly children?: React.ReactNode;
    readonly childrenComponent?: (p: PropsChildComponent) => JSX.Element;
} & (
    | { children: React.ReactNode }
    | {
          childrenComponent: (p: PropsChildComponent) => JSX.Element;
      }
);
export const LayoutContainer = ({ ...props }: LayoutContainerProps) => {
    const vm = useValueWithEffect(() => newLayoutViewModel(props), []);

    const [isOpen, page, basketAmount] = useProperties(
        vm.isOpen,
        vm.page,
        vm.basketAmount
    );

    return React.createElement(Layout, {
        ...props,
        ...vm,
        isOpen,
        page,
        basketAmount,
    });
};
