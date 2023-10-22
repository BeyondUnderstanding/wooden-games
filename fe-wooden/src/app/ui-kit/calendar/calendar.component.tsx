import { useState } from 'react';
import { Calendar as CalendarLib, TileArgs } from 'react-calendar';
import './calendar.module.css';
import { ArrowIcon, ArrowIconLeft } from '../icons/arrow-icon.component';
import css from './calendar.module.css';
import { Button } from '../button/button.component';
import { constVoid } from 'fp-ts/lib/function';
import { CloseIcon } from '../icons/close-icon.component';
import { InputType, SelectInput } from '../select-input/select-input.component';

export interface CalendarProps {
    readonly onClose: () => void;
    readonly onSelectDate: () => void;
    readonly occupiedDates: Array<Date>;
}

const initTimeHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

const toInputType = (el: number): InputType => ({
    value: el,
    label: `${el}:00`,
});

export const Calendar = ({
    onClose,
    onSelectDate,
    occupiedDates,
}: CalendarProps) => {
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const highlightDates = ({ date, view }: TileArgs) =>
        view === 'month' &&
        occupiedDates.map((d) => d.getDate()).includes(date.getDate()) &&
        occupiedDates.map((d) => d.getMonth()).includes(date.getMonth())
            ? 'highlighted-date'
            : null;

    return (
        <div className={css.wrap}>
            <div className={css.header}>
                <span className={css.activeDate}>
                    {date.getDate()}{' '}
                    {date.toLocaleString('en-us', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </span>
                <button className={css.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>
            <CalendarLib
                //@ts-ignore
                onChange={setDate}
                value={date}
                view="month"
                showNeighboringMonth={true}
                next2Label={null}
                prev2Label={null}
                nextLabel={<ArrowIcon />}
                prevLabel={<ArrowIconLeft />}
                locale="en-US"
                tileClassName={highlightDates}
            />
            <div className={css.timeSelectWrap}>
                <SelectInput
                    options={initTimeHours.map(toInputType)}
                    initialLabel={'Start'}
                    onChange={(d) => setStartTime(d.label)}
                />
                <span>—</span>
                <SelectInput
                    options={initTimeHours.map((el) => toInputType(el + 3))}
                    initialLabel={'End'}
                    onChange={(d) => setEndTime(d.label)}
                />
            </div>

            <Button
                label={'Choose this date'}
                onClick={onSelectDate}
                disabled={false}
                type={'def'}
            />
        </div>
    );
};
