'use client';

import css from './button.module.css';
import cn from 'classnames';

export type ButtonType = 'def' | 'prime' | 'error' | 'link';

export interface ButtonProps {
    readonly label: string;
    readonly onClick: () => void;
    readonly disabled: boolean;
    readonly size?: 'small' | 'medium';
    readonly type: ButtonType;
    readonly theme?: Array<string>;
}

export const Button = ({
    disabled,
    label,
    onClick,
    size = 'small',
    type = 'def',
    theme = [],
}: ButtonProps) => {
    return (
        <button
            onClick={() => !disabled && onClick()}
            className={cn(css.wrap, ...theme, {
                [css.disabled]: disabled,
                [css.small]: size === 'small',
                [css.medium]: size === 'medium',
                [css.prime]: type === 'prime',
                [css.error]: type === 'error',
                [css.link]: type === 'link',
            })}
        >
            {label}
        </button>
    );
};
