import type { Meta, StoryObj } from '@storybook/react';
import { SelectInput, SelectInputProps } from './select-input.component';
import { constVoid } from 'fp-ts/lib/function';

const meta: Meta<typeof SelectInput> = {
    component: SelectInput,
};

export default meta;
type Story = StoryObj<SelectInputProps>;

export const SelectInputStory: Story = {
    name: 'SelectInput',
    args: {
        options: [
            { value: 12, label: '12:00' },
            { value: 13, label: '13:00' },
            { value: 14, label: '14:00' },
            { value: 15, label: '15:00' },
        ],
        // value: { value: 12, label: '12:00' },
        onChange: constVoid,
        initialLabel: 'Start',
    },
    render: ({ ...args }) => <SelectInput {...args} />,
};
