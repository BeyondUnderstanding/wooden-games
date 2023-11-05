'use client';
import React from 'react';
import { useProperty } from '@frp-ts/react';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { newCalendarViewModel } from './calendar.view-model';
import { Calendar } from './calendar.component';
import { InputType } from '../select-input/select-input.component';
import { ChosenDate } from '../layout/layout.component';

export interface SelectInputsLabels {
    start: InputType;
    end: InputType;
}

export interface CalendarContainerProps {
    readonly onClose: () => void;
    readonly onSelectDate: (
        x: string,
        date: Date,
        labels: SelectInputsLabels
    ) => void;
    readonly occupiedDates: Array<Date>;
    readonly selectDate: ChosenDate;
    readonly initialStartLabel: string;
    readonly initialEndLabel: string;
}

export const CalendarContainer = ({
    onSelectDate,
    occupiedDates,
    selectDate,
    ...props
}: CalendarContainerProps) => {
    const vm = useValueWithEffect(
        () => newCalendarViewModel({ occupiedDates, onSelectDate, selectDate }),
        []
    );

    return React.createElement(Calendar, {
        ...props,
        ...vm,
        date: useProperty(vm.date),
        startTime: useProperty(vm.startTime),
        endTime: useProperty(vm.endTime),
        optionsStart: useProperty(vm.optionsStart),
        optionsEnd: useProperty(vm.optionsEnd),
        notFillStartTimeError: useProperty(vm.notFillStartTimeError),
        notFillEndTimeError: useProperty(vm.notFillEndTimeError),
    });
};
