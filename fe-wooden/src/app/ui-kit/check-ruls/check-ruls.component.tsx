import { AlarmIcon } from '../icons/alarm-icon.component';
import cn from 'classnames';
import css from './check-ruls.module.css';

export interface CheckRulsProps {}

export const CheckRuls = ({}: CheckRulsProps) => {
    return (
        <div className={cn(css.wrap)}>
            <AlarmIcon />
            <span className={cn(css.text)}>
                Before booking the game, please read the terms and{' '}
                <span className={cn(css.subText)}>
                    conditions of the rental
                </span>
            </span>
        </div>
    );
};
