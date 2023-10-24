import { useEffect, useRef, useState } from 'react';
import css from './select-input.module.css';
import cn from 'classnames';
import { ArrowIcon } from '../icons/arrow-icon.component';

export interface InputType {
    readonly value: number;
    readonly label: string;
    readonly isDisable: boolean;
}

export interface SelectInputProps {
    readonly options: Array<InputType>;
    readonly isOpen: boolean;
    readonly selected: string;
    readonly toggleSelect: () => void;
    readonly setIsOpen: (x: boolean) => void;
    readonly handleOptionClick: (option: InputType) => void;
    readonly notFillTimeError: boolean;
}

export const SelectInput = ({
    options,
    isOpen,
    selected,
    toggleSelect,
    setIsOpen,
    handleOptionClick,
    notFillTimeError,
}: SelectInputProps) => {
    const selectRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        /*
            any - это плохо но мне лень чинить типы
        */
        const closeSelect = (event: any) => {
            if (
                isOpen &&
                !!selectRef.current &&
                !selectRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', closeSelect);

        return () => {
            document.removeEventListener('click', closeSelect);
        };
    }, [isOpen, setIsOpen]);

    return (
        <div
            className={cn(css['custom-select'], {
                [css.open]: isOpen,
                [css.error]: notFillTimeError,
            })}
            ref={selectRef}
        >
            <div
                className={cn(css['select-header'], { [css.open]: isOpen })}
                onClick={toggleSelect}
            >
                {selected}
                <div className={cn(css.arrow, { [css.open]: isOpen })}>
                    <ArrowIcon />
                </div>
            </div>
            {isOpen && (
                <ul className={css.options}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() =>
                                !option.isDisable && handleOptionClick(option)
                            }
                            className={cn({
                                [css.isDisableOption]: option.isDisable,
                            })}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
