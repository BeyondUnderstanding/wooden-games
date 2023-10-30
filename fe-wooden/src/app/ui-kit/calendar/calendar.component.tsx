'use client';

import { Calendar as CalendarLib, TileArgs } from 'react-calendar';
import './calendar.module.css';
import { ArrowIcon, ArrowIconLeft } from '../icons/arrow-icon.component';
import css from './calendar.module.css';
import { Button } from '../button/button.component';
import { CloseIcon } from '../icons/close-icon.component';
import { InputType } from '../select-input/select-input.component';
import { SelectInputContainer } from '../select-input/select-input.container';

export interface CalendarProps {
    readonly onClose: () => void;
    readonly onSelectDate: () => void;
    readonly date: Date;
    readonly setDate: (d: Date) => void;
    readonly startTime: InputType | undefined;
    readonly endTime: InputType | undefined;
    readonly optionsStart: Array<InputType>;
    readonly optionsEnd: Array<InputType>;
    readonly highlightDates: ({ date, view }: TileArgs) => string | null;
    readonly highlightDatesToltip: ({
        date,
        view,
    }: TileArgs) => JSX.Element | null;
    readonly setStartTime: (t: InputType) => void;
    readonly setEndTime: (t: InputType) => void;
    readonly notFillStartTimeError: boolean;
    readonly notFillEndTimeError: boolean;
    readonly initialStartLabel: string;
    readonly initialEndLabel: string;
}

export const Calendar = ({
    onClose,
    onSelectDate,
    date,
    setDate,
    optionsStart,
    optionsEnd,
    highlightDates,
    highlightDatesToltip,
    setStartTime,
    setEndTime,
    notFillStartTimeError,
    notFillEndTimeError,
    initialStartLabel,
    initialEndLabel,
}: CalendarProps) => {
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
                tileContent={highlightDatesToltip}
            />
            <div className={css.timeSelectWrap}>
                <SelectInputContainer
                    options={optionsStart}
                    initialLabel={initialStartLabel}
                    onChange={(d) => setStartTime(d)}
                    notFillTimeError={notFillStartTimeError}
                />
                <span>—</span>
                <SelectInputContainer
                    options={optionsEnd}
                    initialLabel={initialEndLabel}
                    onChange={(d) => setEndTime(d)}
                    notFillTimeError={notFillEndTimeError}
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
