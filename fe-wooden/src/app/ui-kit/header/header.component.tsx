'use client';

import css from './header.module.css';
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';
import { Property } from '@frp-ts/core';
import { ChosenDate } from '../layout/layout.component';
import Link from 'next/link';
import cn from 'classnames';

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
}

export const Header = ({
    chosenDate,
    setChosenDate,
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
            />
            <div className={css.crumbs}>
                <span>About Us</span>
                <span>Rental Rules</span>
                <span>English</span>
                <BasketCrumbs {...props} />
            </div>
        </header>
    );
};
