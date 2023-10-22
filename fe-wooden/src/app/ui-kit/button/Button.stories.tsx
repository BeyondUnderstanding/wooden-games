import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './button.component';
import { constVoid } from 'fp-ts/lib/function';

const meta: Meta<typeof Button> = {
    component: Button,
    argTypes: {
        disabled: { control: 'boolean' },
        label: { control: 'text' },
        onClick: { action: 'clicked' },
        size: { control: 'radio', options: ['small', 'medium'] },
    },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const ButtonStory: Story = {
    name: 'Button',
    args: {
        disabled: false,
        label: 'Button',
        onClick: constVoid,
    },
    render: ({ ...args }) => <Button {...args} />,
};
