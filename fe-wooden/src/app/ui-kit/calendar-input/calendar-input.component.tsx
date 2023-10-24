import { constVoid } from 'fp-ts/lib/function';
import { Button } from '../button/button.component';

import css from './calendar-input.module.css';
import { useState } from 'react';
import { CalendarContainer } from '../calendar/calendar.container';
import { useMergeState } from '../../../utils/hooks';

export interface CalendarInputProps {}

export const CalendarInput = ({}: CalendarInputProps) => {
    const [chosenDate, setChosenDate] = useState('Any Date');
    const [calendarIsShown, setCalendarIsShown] = useState(false);
    const [selectdDate, setSelectdDate] = useState(new Date());
    const [selectLabels, setSelectLabels] = useMergeState({
        start: 'Start',
        end: 'End',
    });

    return (
        <div className={css.wrap}>
            <div className={css.wrapInput}>
                {chosenDate}
                <Button
                    label={'Choose Dates'}
                    onClick={() => setCalendarIsShown(true)}
                    disabled={false}
                    type={chosenDate.length < 10 ? 'def' : 'prime'}
                />
            </div>
            <div className={css.calendarWrap}>
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
