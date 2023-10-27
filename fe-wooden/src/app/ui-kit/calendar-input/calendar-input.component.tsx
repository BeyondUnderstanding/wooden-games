import { Button } from '../button/button.component';
import css from './calendar-input.module.css';
import { useRef, useState } from 'react';
import { CalendarContainer } from '../calendar/calendar.container';
import { useMergeState, useOutsideClick } from '../../../utils/hooks';
import cn from 'classnames';

export interface CalendarInputProps {
    readonly isBasket?: boolean;
}

export const CalendarInput = ({ isBasket = false }: CalendarInputProps) => {
    const [chosenDate, setChosenDate] = useState(
        isBasket ? 'Lease date not specified' : 'Any Date'
    );
    const [calendarIsShown, setCalendarIsShown] = useState(false);
    // const [selectdDate, setSelectdDate] = useState(new Date());
    const [selectdDate, setSelectdDate] = useState(new Date());
    const [selectLabels, setSelectLabels] = useMergeState({
        start: 'Start',
        end: 'End',
    });

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
                        [css.error]: !chosenDate.includes(
                            new Date().getFullYear().toString()
                        ),
                    })}
                >
                    {chosenDate}
                </h4>
                <Button
                    label={isBasket ? 'Choose another date' : 'Choose Dates'}
                    onClick={() => setCalendarIsShown(true)}
                    disabled={false}
                    type={
                        isBasket
                            ? 'link'
                            : chosenDate.includes(
                                  new Date().getFullYear().toString()
                              )
                            ? 'prime'
                            : 'def'
                    }
                />
            </div>
            <div
                className={cn(css.calendarWrap, { [css.basket]: isBasket })}
                ref={refCalendar}
            >
                {calendarIsShown && (
                    <CalendarContainer
                        onClose={() => setCalendarIsShown(false)}
                        onSelectDate={(x, date, labels) => {
                            setChosenDate(x);
                            setCalendarIsShown(false);
                            setSelectdDate(date);
                            setSelectLabels(labels);
                        }}
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
