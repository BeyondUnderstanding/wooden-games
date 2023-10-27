import { useEffect, useState } from 'react';
import css from './check-box.module.css';

interface CheckBoxProps {
    readonly children: JSX.Element;
    readonly getCheckedState: (x: boolean) => void;
}

export const CheckBox = ({ children, getCheckedState }: CheckBoxProps) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        getCheckedState(isChecked);
    }, [getCheckedState, isChecked]);

    return (
        <label className={css['custom-checkbox']}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                    setIsChecked(!isChecked);
                }}
            />
            <span className={css['checkmark']}></span>
            <span className={css.label}>{children}</span>
        </label>
    );
};
