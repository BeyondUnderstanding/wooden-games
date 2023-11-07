import { FormDataField } from '../side-popup/check-out-popup.component';
import css from './input.module.css';
import cn from 'classnames';

interface InputProps {
    readonly value: FormDataField;
    readonly placeholder: string;
    readonly onChenge: (x: string) => void;
}

export const Input = ({ value, onChenge, placeholder }: InputProps) => {
    return (
        <input
            value={value.data ?? ''}
            onChange={(e) => onChenge(e.currentTarget.value)}
            className={cn(css.input, { [css.notValid]: !value.isValid })}
            placeholder={placeholder}
        />
    );
};
