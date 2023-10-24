import { Property } from '@frp-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { InputType } from './select-input.component';

interface SelectInputViewModel {
    readonly isOpen: Property<boolean>;
    readonly selected: Property<string>;
    readonly toggleSelect: () => void;
    readonly setIsOpen: (x: boolean) => void;
    readonly handleOptionClick: (option: InputType) => void;
}
interface NewSelectInputViewModelProperty {
    readonly onChange: (data: InputType) => void;
    readonly initialLabel: string;
}

type NewSelectInputViewModel = (
    props: NewSelectInputViewModelProperty
) => ValueWithEffect<SelectInputViewModel>;

export const newSelectInputViewModel: NewSelectInputViewModel = ({
    onChange,
    initialLabel,
}) => {
    const isOpen = newLensedAtom(false);
    const selected = newLensedAtom(initialLabel);

    const toggleSelect = () => isOpen.modify((s) => !s);

    const handleOptionClick = (option: InputType) => {
        onChange(option);
        selected.set(option.label);
        toggleSelect();
    };

    return valueWithEffect.new({
        isOpen,
        selected,
        toggleSelect,
        handleOptionClick,
        setIsOpen: (x) => isOpen.set(x),
    });
};
