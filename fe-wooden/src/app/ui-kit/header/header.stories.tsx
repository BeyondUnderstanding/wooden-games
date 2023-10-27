import type { Meta, StoryObj } from '@storybook/react';
import { Header, HeaderProps } from './header.component';
import { constVoid } from 'fp-ts/lib/function';

const meta: Meta<typeof Header> = {
    component: Header,
};

export default meta;
type Story = StoryObj<HeaderProps>;

export const HeaderStory: Story = {
    name: 'Header',
    args: {
        openBasket: constVoid,
        basketAmount: 1,
    },
    render: ({ ...args }) => <Header {...args} />,
};
