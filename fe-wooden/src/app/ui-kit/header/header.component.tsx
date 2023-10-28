import css from './header.module.css';
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';

interface BasketCrumbsProps {
    openBasket: () => void;
    basketAmount: number;
}

const BasketCrumbs = ({ openBasket, basketAmount }: HeaderProps) => {
    return (
        <div className={css.basketCrumbsWrap}>
            <span onClick={openBasket}>Cart</span>
            <span className={css.amount}>{basketAmount}</span>
        </div>
    );
};

export interface HeaderProps extends BasketCrumbsProps {}

export const Header = (props: HeaderProps) => {
    return (
        <header className={css.wrap}>
            <span className={css.label}>Wooden Games</span>
            <CalendarInputContainer />
            <div className={css.crumbs}>
                <span>About Us</span>
                <span>Rental Rules</span>
                <span>English</span>
                <BasketCrumbs {...props} />
            </div>
        </header>
    );
};
