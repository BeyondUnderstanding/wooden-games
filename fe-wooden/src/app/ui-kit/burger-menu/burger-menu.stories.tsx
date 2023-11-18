import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import BurgerMenu from './burger-menu.component';

const meta: Meta<typeof BurgerMenu> = {
    component: BurgerMenu,
};

export default meta;

type Story = StoryObj;

export const BurgerMenuStory: Story = {
    name: 'BurgerMenu',

    render: () => <BurgerMenu />,
};
