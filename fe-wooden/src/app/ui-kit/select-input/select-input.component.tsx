import { useEffect, useRef, useState } from 'react';
import css from './select-input.module.css';
import cn from 'classnames';
import { ArrowIcon } from '../icons/arrow-icon.component';

export interface InputType {
    readonly value: number;
    readonly label: string;
}

export interface SelectInputProps {
    readonly options: Array<InputType>;
    readonly initialLabel: string;
    readonly onChange: (data: InputType) => void;
}

export const SelectInput = ({
    options,
    onChange,
    initialLabel,
}: SelectInputProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>(initialLabel);
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
    }, [isOpen]);

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: (typeof options)[0]) => {
        onChange(option);
        setSelected(option.label);
        toggleSelect();
    };

    return (
        <div
            className={cn(css['custom-select'], { [css.open]: isOpen })}
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
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
