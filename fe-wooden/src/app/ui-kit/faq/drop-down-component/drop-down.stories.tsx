import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DropDown from './drop-down.component';

const meta: Meta<typeof DropDown> = {
    component: DropDown,
};

export default meta;

type Story = StoryObj;

export const DropDownStory: Story = {
    name: 'DropDown',

    render: () => <DropDown />,
};
