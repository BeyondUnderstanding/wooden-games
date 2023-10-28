'use client';
import React from 'react';
import { newDefaultScheduler } from '@most/scheduler';
import { useProperty } from '@frp-ts/react';
import { newSelectInputViewModel } from './select-input.view-model';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { InputType, SelectInput } from './select-input.component';

export interface SelectInputContainerPropos {
    readonly options: Array<InputType>;
    readonly initialLabel: string;
    readonly onChange: (data: InputType) => void;
    readonly notFillTimeError: boolean;
}

export const SelectInputContainer = ({
    initialLabel,
    onChange,
    ...props
}: SelectInputContainerPropos) => {
    const vm = useValueWithEffect(newDefaultScheduler())(
        () => newSelectInputViewModel({ onChange, initialLabel }),
        []
    );

    return React.createElement(SelectInput, {
        ...props,
        isOpen: useProperty(vm.isOpen),
        selected: useProperty(vm.selected),
        toggleSelect: vm.toggleSelect,
        setIsOpen: vm.setIsOpen,
        handleOptionClick: vm.handleOptionClick,
    });
};
