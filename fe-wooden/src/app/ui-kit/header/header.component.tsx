'use client';

import css from './header.module.css';
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';
import { Property } from '@frp-ts/core';
import { ChosenDate } from '../layout/layout.component';
import Link from 'next/link';
import cn from 'classnames';
import { Stream } from '@most/types';
import { useState } from 'react';
import BurgerMenu from '../burger-menu/burger-menu.component';
import BurgerIcon from '../burger-icon/burger-icon.component';

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
    readonly openRentalRuls: () => void;
}

export const Header = ({
    chosenDate,
    setChosenDate,
    updateDate,
    occupiedDates,
    openRentalRuls,
    ...props
}: HeaderProps) => {
    const [isBurgerOpen, setOpen] = useState(false);

    return (
        <header className={css.wrap}>
            <div className={css.titleWrap}>
                <div className={css.burgerIconWrap}>
                    <BurgerIcon
                        isBurgerOpen={isBurgerOpen}
                        setOpen={(open) => setOpen(open)}
                    />
                </div>
                <div
                    className={cn(css.burgerMenuClose, {
                        [css.burgerMenuOpen]: isBurgerOpen,
                    })}
                >
                    <BurgerMenu openRentalRuls={openRentalRuls} />
                </div>

                <Link href={'/'}>
                    <span className={css.label}>Wooden Games</span>
                </Link>
            </div>
            <div className={css.calendarInput}>
                <CalendarInputContainer
                    chosenDate={chosenDate}
                    setChosenDate={setChosenDate}
                    label="Choose Dates"
                    unsetLabel="Any Date"
                    updateDate={updateDate}
                    occupiedDates={occupiedDates}
                />
            </div>
            <div className={css.crumbs}>
                <div className={css.links}>
                    <Link href={'/about-us'}>About Us</Link>
                    <span onClick={openRentalRuls}>Rental Rules</span>
                    {/* <Link href={'/'}>English</Link> */}
                </div>
                <BasketCrumbs {...props} />
            </div>
        </header>
    );
};
