'use client';
import React from 'react';
import { newDefaultScheduler } from '@most/scheduler';
import { useProperty } from '@frp-ts/react';
import { useValueWithEffect } from '../../../utils/run-view-model.utils';
import { newCalendarViewModel } from './calendar.view-model';
import { Calendar } from './calendar.component';

export interface CalendarContainerProps {
    readonly onClose: () => void;
    readonly onSelectDate: () => void;
    readonly occupiedDates: Array<Date>;
}

export const CalendarContainer = ({
    onClose,
    onSelectDate,
    occupiedDates,
}: CalendarContainerProps) => {
    const vm = useValueWithEffect(newDefaultScheduler())(
        () => newCalendarViewModel({ occupiedDates }),
        []
    );

    return React.createElement(Calendar, {
        ...vm,
        date: useProperty(vm.date),
        startTime: useProperty(vm.startTime),
        endTime: useProperty(vm.endTime),
        optionsStart: useProperty(vm.optionsStart),
        optionsEnd: useProperty(vm.optionsEnd),
        onClose,
        onSelectDate,
    });
};
