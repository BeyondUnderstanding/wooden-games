import type { Meta, StoryObj } from '@storybook/react';
import { ShortInformation } from './short-information-section.component';
import React from 'react';

const meta: Meta<typeof ShortInformation> = {
    component: ShortInformation,
};

export default meta;

type Story = StoryObj;

export const ShortInformationStory: Story = {
    name: 'ShortInformation',

    render: () => <ShortInformation />,
};
