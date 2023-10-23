import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput, SelectInputProps } from './select-input.component';
import { constVoid } from 'fp-ts/lib/function';
import {
    SelectInputContainer,
    SelectInputContainerPropos,
} from './select-input.container';

const meta: Meta<typeof SelectInputContainer> = {
    component: SelectInputContainer,
};

export default meta;
type Story = StoryObj<SelectInputContainerPropos>;

export const SelectInputStory: Story = {
    name: 'SelectInput',
    args: {
        options: [
            { value: 12, label: '12:00', isDisable: true },
            { value: 13, label: '13:00', isDisable: false },
            { value: 14, label: '14:00', isDisable: false },
            { value: 15, label: '15:00', isDisable: false },
        ],
        // value: { value: 12, label: '12:00' },
        onChange: constVoid,
        initialLabel: 'Start',
    },
    render: ({ ...args }) => <SelectInputContainer {...args} />,
};
