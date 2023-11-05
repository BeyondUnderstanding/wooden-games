import { AlarmIcon } from '../icons/alarm-icon.component';
import cn from 'classnames';
import css from './check-ruls.module.css';

export interface CheckRulsProps {
    readonly goToCheckRulse: () => void;
    readonly theme?: Array<string>;
}

export const CheckRuls = ({ goToCheckRulse, theme = [] }: CheckRulsProps) => {
    return (
        <div className={cn(css.wrap, ...theme)}>
            <AlarmIcon />
            <span className={cn(css.text)}>
                Before booking the game, please read the terms and{' '}
                <span className={cn(css.subText)} onClick={goToCheckRulse}>
                    conditions of the rental
                </span>
            </span>
        </div>
    );
};
