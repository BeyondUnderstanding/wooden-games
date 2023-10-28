import css from './input.module.css';
import cn from 'classnames';

interface InputProps {
    readonly value: string;
    readonly placeholder: string;
    readonly onChenge: (x: string) => void;
}

export const Input = ({ value, onChenge, placeholder }: InputProps) => {
    return (
        <input
            onChange={(e) => onChenge(e.target.value)}
            className={css.input}
            placeholder={placeholder}
        />
    );
};
