import { useState } from 'react';
import { Calendar as CalendarLib, TileArgs } from 'react-calendar';
import './calendar.module.css';
import { ArrowIcon, ArrowIconLeft } from '../icons/arrow-icon.component';
import css from './calendar.module.css';
import { Button } from '../button/button.component';
import { constVoid } from 'fp-ts/lib/function';
import { CloseIcon } from '../icons/close-icon.component';

export interface CalendarProps {
    onClose: () => void;
    onSelectDate: () => void;
    occupiedDates: Array<Date>;
}

export const Calendar = ({
    onClose,
    onSelectDate,
    occupiedDates,
}: CalendarProps) => {
    const highlightDates = ({ date, view }: TileArgs) =>
        view === 'month' &&
        occupiedDates.map((d) => d.getDate()).includes(date.getDate()) &&
        occupiedDates.map((d) => d.getMonth()).includes(date.getMonth())
            ? 'highlighted-date'
            : null;
    const [date, setDate] = useState(new Date());
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
            <Button
                label={'Choose this date'}
                onClick={onSelectDate}
                disabled={false}
                type={'def'}
            />
        </div>
    );
};
