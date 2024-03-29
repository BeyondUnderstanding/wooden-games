'use client';

import { Button, ButtonType } from '../button/button.component';
import css from './calendar-input.module.css';
import { useRef } from 'react';
import {
    CalendarContainer,
    SelectInputsLabels,
} from '../calendar/calendar.container';
import { useOutsideClick } from '../../../utils/hooks';
import cn from 'classnames';
import { ChosenDate } from '../layout/layout.component';

export interface CalendarInputProps {
    readonly isBasket?: boolean;
    readonly label: string;
    readonly unsetLabel: string;
    readonly chosenDate: ChosenDate;
    readonly selectLabels: {
        start: string;
        end: string;
    };
    readonly calendarIsShown: boolean;
    readonly onSelectDate: (
        x: string,
        date: Date,
        labels: SelectInputsLabels
    ) => void;
    readonly setCalendarIsShown: (x: boolean) => void;
    readonly buttonType: ButtonType;
    readonly isHeaderError: boolean;
    readonly theme?: {
        readonly button: Array<string>;
        readonly wrap: Array<string>;
    };
    readonly occupiedDates: Array<Date>;
}

export const CalendarInput = ({
    isBasket = false,
    label,
    unsetLabel,
    chosenDate,
    selectLabels,
    calendarIsShown,
    setCalendarIsShown,
    onSelectDate,
    buttonType,
    isHeaderError,
    theme = { button: [], wrap: [] },
    occupiedDates,
}: CalendarInputProps) => {
    const refCalendar = useRef<HTMLDivElement | null>(null);
    useOutsideClick(refCalendar, calendarIsShown, () =>
        setCalendarIsShown(false)
    );

    return (
        <div className={cn(css.wrap, { [css.basket]: isBasket })}>
            <div
                className={cn(css.wrapInput, ...theme.wrap, {
                    [css.basket]: isBasket,
                })}
            >
                <h4
                    className={cn(
                        {
                            [css.date]: isBasket,
                            [css.error]: isHeaderError,
                        },
                        css.header
                    )}
                >
                    {chosenDate.label ?? unsetLabel}
                </h4>
                <Button
                    label={label}
                    onClick={() => setCalendarIsShown(true)}
                    disabled={false}
                    type={buttonType}
                    theme={theme.button}
                />
            </div>
            <div
                className={cn(css.calendarWrap, { [css.basket]: isBasket })}
                ref={refCalendar}
            >
                {calendarIsShown && (
                    <CalendarContainer
                        onClose={() => setCalendarIsShown(false)}
                        onSelectDate={onSelectDate}
                        occupiedDates={occupiedDates}
                        selectDate={chosenDate}
                        initialStartLabel={selectLabels.start}
                        initialEndLabel={selectLabels.end}
                    />
                )}
            </div>
        </div>
    );
};
