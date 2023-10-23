import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardProps } from './card.component';

const meta: Meta<typeof Card> = {
    component: Card,
    argTypes: {
        disabled: { control: 'boolean' },
        name: { control: 'text' },
        coast: { control: 'number' },
        onClick: { action: 'clicked' },
    },
};

export default meta;
type Story = StoryObj<CardProps>;

const testOnClick = () => console.log('testClick on card');

export const CardStory: Story = {
    name: 'Card',
    args: {
        disabled: false,
        name: 'ZigZag',
        coast: 56,
        onClick: testOnClick,
    },

    render: ({ ...args }) => <Card {...args} />,
};
