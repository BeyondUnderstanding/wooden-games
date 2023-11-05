import { Property } from '@frp-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { InputType } from '../select-input/select-input.component';
import { newLensedAtom } from '@frp-ts/lens';
import { TileArgs } from 'react-calendar';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '../../../utils/property.utils';
import { multicast, tap } from '@most/core';
import { SelectInputsLabels } from './calendar.container';

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
    readonly highlightDatesToltip: ({
        date,
        view,
    }: TileArgs) => JSX.Element | null;
    readonly onSelectDate: () => void;
    readonly notFillStartTimeError: Property<boolean>;
    readonly notFillEndTimeError: Property<boolean>;
}

interface NewCalendarViewModelProperty {
    readonly onSelectDate: (
        x: string,
        date: Date,
        label: SelectInputsLabels
    ) => void;
    readonly occupiedDates: Array<Date>;
    readonly selectDate: Date;
}

type NewCalendarViewModel = (
    props: NewCalendarViewModelProperty
) => ValueWithEffect<CalendarViewModel>;

export const newCalendarViewModel: NewCalendarViewModel = ({
    occupiedDates,
    onSelectDate,
    selectDate,
}) => {
    const initTimeHours = [
        9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    ];

    const toInputType = (el: number): InputType => ({
        value: el,
        label: `${el}:00`,
        isDisable: false,
    });

    const date = newLensedAtom(selectDate);
    const startTime = newLensedAtom<InputType | undefined>(undefined);
    const endTime = newLensedAtom<InputType | undefined>(undefined);
    const optionsStart = newLensedAtom(initTimeHours.map(toInputType));
    const optionsEnd = newLensedAtom(
        initTimeHours.map((el) =>
            el > 11 ? toInputType(el) : { ...toInputType(el), isDisable: true }
        )
    );

    const notFillStartTimeError = newLensedAtom(false);
    const notFillEndTimeError = newLensedAtom(false);

    const highlightDates = ({ date, view }: TileArgs) =>
        view === 'month' &&
        occupiedDates.map((d) => d.getDate()).includes(date.getDate()) &&
        occupiedDates.map((d) => d.getMonth()).includes(date.getMonth())
            ? 'highlighted-date'
            : null;

    const highlightDatesToltip = ({ date, view }: TileArgs) =>
        view === 'month' &&
        occupiedDates.map((d) => d.getDate()).includes(date.getDate()) &&
        occupiedDates.map((d) => d.getMonth()).includes(date.getMonth()) ? (
            <span className="toltip-date">
                Some items are not available on this date
            </span>
        ) : null;

    const selectDateCb = () => {
        const end = endTime.get();
        const start = startTime.get();

        if (end !== undefined && start !== undefined) {
            onSelectDate(
                `${date.get().getDate()} ${date.get().toLocaleString('en-us', {
                    month: 'long',
                    year: 'numeric',
                })}, ${end.value - start.value} h`,
                date.get(),
                {
                    start,
                    end,
                }
            );
        } else {
            notFillStartTimeError.set(true);
            notFillEndTimeError.set(true);
        }
    };

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
        }),
        multicast
    );

    const setDisableOptionsEndTimeEffect = pipe(
        endTime,
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
        }),
        multicast
    );

    const switchErrorStateStartTimeEffect = pipe(
        startTime,
        fromProperty,
        tap((_) => notFillStartTimeError.set(false)),
        multicast
    );

    const switchErrorStateEndTimeEffect = pipe(
        endTime,
        fromProperty,
        tap((_) => notFillEndTimeError.set(false)),
        multicast
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
            highlightDatesToltip,
            onSelectDate: selectDateCb,
            setStartTime: (x) => startTime.set(x),
            setEndTime: (x) => endTime.set(x),
            notFillStartTimeError,
            notFillEndTimeError,
        },
        setDisableOptionsStartTimeEffect,
        setDisableOptionsEndTimeEffect,
        switchErrorStateStartTimeEffect,
        switchErrorStateEndTimeEffect
    );
};
