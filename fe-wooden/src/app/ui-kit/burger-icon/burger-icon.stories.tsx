import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import BurgerIcon, { BurgerIconProps } from './burger-icon.component';

const meta: Meta<typeof BurgerIcon> = {
    component: BurgerIcon,
    argTypes: {
        isBurgerOpen: { control: 'boolean' },
        setOpen: { action: 'clicked' },
    },
};

export default meta;

type Story = StoryObj<BurgerIconProps>;

export const BurgerIconStory: Story = {
    name: 'BurgerIcon',
    args: {
        isBurgerOpen: false,
        setOpen: (state: boolean) => !state,
    },

    render: ({ ...args }) => <BurgerIcon {...args} />,
};
