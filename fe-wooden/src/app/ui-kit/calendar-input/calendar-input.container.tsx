'use client';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { newCalendarInputViewModel } from './calendar-input.view-model';
import { CalendarInput } from './calendar-input.component';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { Property } from '@frp-ts/core';
import { ChosenDate } from '../layout/layout.component';
import { Stream } from '@most/types';

export interface CalendarInputContainerProps {
    readonly isBasket?: boolean;
    readonly chosenDate: Property<ChosenDate>;
    readonly setChosenDate: (x: ChosenDate) => void;
    readonly label: string;
    readonly unsetLabel: string;
    readonly theme?: {
        readonly button: Array<string>;
        readonly wrap: Array<string>;
    };
    readonly updateDate: (date: ChosenDate) => Stream<unknown>;
}

export const CalendarInputContainer = ({
    ...props
}: CalendarInputContainerProps) => {
    const vm = useValueWithEffect(() => newCalendarInputViewModel(props), []);

    return React.createElement(CalendarInput, {
        ...props,
        chosenDate: useProperty(vm.chosenDate),
        selectLabels: useProperty(vm.selectLabels),
        calendarIsShown: useProperty(vm.calendarIsShown),
        buttonType: useProperty(vm.buttonType),
        isHeaderError: useProperty(vm.isHeaderError),
        onSelectDate: vm.onSelectDate,
        setCalendarIsShown: vm.setCalendarIsShown,
    });
};
