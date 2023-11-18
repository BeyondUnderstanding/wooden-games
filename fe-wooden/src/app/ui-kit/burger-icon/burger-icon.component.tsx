'use client';

import css from './burger-icon.module.css';
import cn from 'classnames';

export interface BurgerIconProps {
    isBurgerOpen: boolean;
    setOpen: (state: boolean) => void;
}

const BurgerIcon = ({ isBurgerOpen, setOpen }: BurgerIconProps) => {
    return (
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
    );
};
export default BurgerIcon;
