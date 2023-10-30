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

export interface CalendarInputProps {
    readonly isBasket?: boolean;
    readonly chosenDate: string;
    readonly selectdDate: Date;
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
}

export const CalendarInput = ({
    isBasket = false,
    chosenDate,
    selectdDate,
    selectLabels,
    calendarIsShown,
    setCalendarIsShown,
    onSelectDate,
    buttonType,
    isHeaderError,
}: CalendarInputProps) => {
    const refCalendar = useRef<HTMLDivElement | null>(null);
    useOutsideClick(refCalendar, calendarIsShown, () =>
        setCalendarIsShown(false)
    );

    return (
        <div className={cn(css.wrap, { [css.basket]: isBasket })}>
            <div className={cn(css.wrapInput, { [css.basket]: isBasket })}>
                <h4
                    className={cn({
                        [css.date]: isBasket,
                        [css.error]: isHeaderError,
                    })}
                >
                    {chosenDate}
                </h4>
                <Button
                    label={isBasket ? 'Choose another date' : 'Choose Dates'}
                    onClick={() => setCalendarIsShown(true)}
                    disabled={false}
                    type={buttonType}
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
                        occupiedDates={[]}
                        selectDate={selectdDate}
                        initialStartLabel={selectLabels.start}
                        initialEndLabel={selectLabels.end}
                    />
                )}
            </div>
        </div>
    );
};
