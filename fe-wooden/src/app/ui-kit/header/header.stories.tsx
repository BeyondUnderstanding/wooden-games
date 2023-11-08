import type { Meta, StoryObj } from '@storybook/react';
import { Header, HeaderProps } from './header.component';
import { constVoid } from 'fp-ts/lib/function';
import { newLensedAtom } from '@frp-ts/lens';

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
        chosenDate: newLensedAtom(''),
        setChosenDate: () => {},
    },
    render: ({ ...args }) => <Header {...args} />,
};
