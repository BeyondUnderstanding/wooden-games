import css from './header.module.css';
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';
import { Property } from '@frp-ts/core';

interface BasketCrumbsProps {
    openBasket: () => void;
    basketAmount: number;
}

const BasketCrumbs = ({ openBasket, basketAmount }: BasketCrumbsProps) => {
    return (
        <div className={css.basketCrumbsWrap}>
            <span onClick={openBasket}>Cart</span>
            <span className={css.amount}>{basketAmount}</span>
        </div>
    );
};

export interface HeaderProps extends BasketCrumbsProps {
    readonly chosenDate: Property<string>;
    readonly setChosenDate: (x: string) => void;
}

export const Header = ({
    chosenDate,
    setChosenDate,
    ...props
}: HeaderProps) => {
    return (
        <header className={css.wrap}>
            <span className={css.label}>Wooden Games</span>
            <CalendarInputContainer
                chosenDate={chosenDate}
                setChosenDate={setChosenDate}
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
