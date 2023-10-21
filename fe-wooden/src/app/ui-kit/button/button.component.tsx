'use client';

import css from './button.module.css';
import cn from 'classnames';

export interface ButtonProps {
    readonly label: string;
    readonly onClick: () => void;
    readonly disabled: boolean;
    readonly size?: 'small' | 'medium';
    readonly type: 'def' | 'prime';
}

export const Button = ({
    disabled,
    label,
    onClick,
    size = 'small',
    type = 'def',
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(css.wrap, {
                [css.disabled]: disabled,
                [css.small]: size === 'small',
                [css.medium]: size === 'medium',
                [css.prime]: type === 'prime',
            })}
        >
            {label}
        </button>
    );
};
