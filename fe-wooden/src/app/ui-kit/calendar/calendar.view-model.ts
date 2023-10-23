import { Property } from '@frp-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { InputType } from '../select-input/select-input.component';
import { newLensedAtom } from '@frp-ts/lens';
import { TileArgs } from 'react-calendar';
import { pipe } from 'fp-ts/lib/function';
import { combineArray } from 'most';
import { fromProperty } from '../../../utils/property.utils';
import { tap } from '@most/core';

interface CalendarViewModel {
    readonly date: Property<Date>;
    readonly setDate: (d: Date) => void;
    readonly startTime: Property<InputType | undefined>;
    readonly setStartTime: (t: InputType) => void;
    readonly endTime: Property<InputType | undefined>;
    readonly setEndTime: (t: InputType) => void;
    readonly optionsStart: Property<Array<InputType>>;
    readonly optionsEnd: Property<Array<InputType>>;
    readonly highlightDates: ({ date, view }: TileArgs) => string | null;
}

interface NewCalendarViewModelProperty {
    readonly occupiedDates: Array<Date>;
}

type NewCalendarViewModel = (
    props: NewCalendarViewModelProperty
) => ValueWithEffect<CalendarViewModel>;

export const newCalendarViewModel: NewCalendarViewModel = ({
    occupiedDates,
}) => {
    const initTimeHours = [
        9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    ];

    const toInputType = (el: number): InputType => ({
        value: el,
        label: `${el}:00`,
        isDisable: false,
    });

    const date = newLensedAtom(new Date());
    const startTime = newLensedAtom<InputType | undefined>(undefined);
    const endTime = newLensedAtom<InputType | undefined>(undefined);
    const optionsStart = newLensedAtom(initTimeHours.map(toInputType));
    const optionsEnd = newLensedAtom(
        initTimeHours.map((el) =>
            el > 11 ? toInputType(el) : { ...toInputType(el), isDisable: true }
        )
    );

    const highlightDates = ({ date, view }: TileArgs) =>
        view === 'month' &&
        occupiedDates.map((d) => d.getDate()).includes(date.getDate()) &&
        occupiedDates.map((d) => d.getMonth()).includes(date.getMonth())
            ? 'highlighted-date'
            : null;

    const setDisableOptionsStartTimeEffect = pipe(
        startTime,
        fromProperty,
        tap((start) => {
            if (start) {
                optionsEnd.set(
                    initTimeHours.map((x) => {
                        if (x < start.value + 3) {
                            return { ...toInputType(x), isDisable: true };
                        } else {
                            return toInputType(x);
                        }
                    })
                );
            }
        })
    );

    const setDisableOptionsEndTimeEffect = pipe(
        startTime,
        fromProperty,
        tap((end) => {
            if (end) {
                optionsStart.set(
                    initTimeHours.map((x) => {
                        if (x > end.value - 3) {
                            return { ...toInputType(x), isDisable: true };
                        } else {
                            return toInputType(x);
                        }
                    })
                );
            }
        })
    );

    return valueWithEffect.new(
        {
            date,
            setDate: (x) => date.set(x),
            startTime,
            endTime,
            optionsStart,
            optionsEnd,
            highlightDates,
            setStartTime: (x) => startTime.set(x),
            setEndTime: (x) => startTime.set(x),
        },
        setDisableOptionsStartTimeEffect,
        setDisableOptionsEndTimeEffect
    );
};
