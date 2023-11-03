import type { Meta, StoryObj } from '@storybook/react';
import AboutUsLower from './about-us-lower.component';
import React from 'react';

const meta: Meta<typeof AboutUsLower> = {
    component: AboutUsLower,
};

export default meta;

type Story = StoryObj;

export const AboutUsLowerStory: Story = {
    name: 'AboutUsLower',

    render: () => <AboutUsLower />,
};
