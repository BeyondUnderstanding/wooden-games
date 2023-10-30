'use client';
import { newDefaultScheduler } from '@most/scheduler';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { newCalendarInputViewModel } from './calendar-input.view-model';
import { CalendarInput } from './calendar-input.component';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { Property } from '@frp-ts/core';

export interface CalendarInputContainerProps {
    readonly isBasket?: boolean;
    readonly chosenDate: Property<string>;
    readonly setChosenDate: (x: string) => void;
}

export const CalendarInputContainer = ({
    ...props
}: CalendarInputContainerProps) => {
    const vm = useValueWithEffect(newDefaultScheduler())(
        () => newCalendarInputViewModel(props),
        []
    );

    return React.createElement(CalendarInput, {
        ...props,
        chosenDate: useProperty(vm.chosenDate),
        selectdDate: useProperty(vm.selectdDate),
        selectLabels: useProperty(vm.selectLabels),
        calendarIsShown: useProperty(vm.calendarIsShown),
        buttonType: useProperty(vm.buttonType),
        isHeaderError: useProperty(vm.isHeaderError),
        onSelectDate: vm.onSelectDate,
        setCalendarIsShown: vm.setCalendarIsShown,
    });
};
