import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './button.component';

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

const testOnClick = () => console.log('testClick');

export const ButtonStory: Story = {
    name: 'Button',
    args: {
        disabled: false,
        label: 'Button',
        onClick: testOnClick,
    },
    render: ({ ...args }) => <Button {...args} />,
};
