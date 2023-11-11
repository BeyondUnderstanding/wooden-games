'use client';

import css from './header.module.css';
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';
import { Property } from '@frp-ts/core';
import { ChosenDate } from '../layout/layout.component';
import Link from 'next/link';
import cn from 'classnames';
import { Stream } from '@most/types';

interface BasketCrumbsProps {
    openBasket: () => void;
    basketAmount: number;
}

const BasketCrumbs = ({ openBasket, basketAmount }: BasketCrumbsProps) => {
    return (
        <div className={css.basketCrumbsWrap}>
            <span onClick={openBasket}>Cart</span>
            <span
                className={cn(css.amount, { [css.notEmpty]: basketAmount > 0 })}
            >
                {basketAmount}
            </span>
        </div>
    );
};

export interface HeaderProps extends BasketCrumbsProps {
    readonly chosenDate: Property<ChosenDate>;
    readonly setChosenDate: (x: ChosenDate) => void;
    readonly updateDate: (date: ChosenDate) => Stream<unknown>;
    readonly occupiedDates: Array<Date>;
}

export const Header = ({
    chosenDate,
    setChosenDate,
    updateDate,
    occupiedDates,
    ...props
}: HeaderProps) => {
    return (
        <header className={css.wrap}>
            <Link href={'/'}>
                <span className={css.label}>Wooden Games</span>
            </Link>
            <CalendarInputContainer
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
                label="Choose Dates"
                unsetLabel="Any Date"
                updateDate={updateDate}
                occupiedDates={occupiedDates}
            />
            <div className={css.crumbs}>
                <Link href={'/about-us'}>
                    <span>About Us</span>
                </Link>
                <span>Rental Rules</span>
                <span>English</span>
                <BasketCrumbs {...props} />
            </div>
        </header>
    );
};
