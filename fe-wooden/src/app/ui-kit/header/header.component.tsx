'use client';

import css from './header.module.css';
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';
import { Property } from '@frp-ts/core';
import { ChosenDate } from '../layout/layout.component';
import Link from 'next/link';
import cn from 'classnames';
import { Stream } from '@most/types';
import { useState } from 'react';
import BurgerMenu from '../burrger-menu/burger-menu.component';

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
    const [isBurgerOpen, setOpen] = useState(false);

    return (
        <header className={css.wrap}>
            <div className={css.titleWrap}>
                <div
                    className={css.burger}
                    onClick={() => {
                        setOpen(!isBurgerOpen);
                    }}
                >
                    <div
                        className={cn(css.line, {
                            [css.lineOpen]: isBurgerOpen,
                            [css.lineClose]: !isBurgerOpen,
                        })}
                    />
                    <div
                        className={cn(css.line, {
                            [css.lineOpen]: isBurgerOpen,
                            [css.lineClose]: !isBurgerOpen,
                        })}
                    />
                    <div
                        className={cn(css.line, {
                            [css.lineOpen]: isBurgerOpen,
                            [css.lineClose]: !isBurgerOpen,
                        })}
                    />
                </div>

                <div
                    className={cn(css.burgerMenuClose, {
                        [css.burgerMenuOpen]: isBurgerOpen,
                    })}
                >
                    <BurgerMenu />
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
                    <Link href={'/'}>Rental Rules</Link>
                    <Link href={'/'}>English</Link>
                </div>
                <BasketCrumbs {...props} />
            </div>
        </header>
    );
};
