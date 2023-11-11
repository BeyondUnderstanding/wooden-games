import type { Meta, StoryObj } from '@storybook/react';
import AboutUsAside from './about-us-aside.component';
import React from 'react';

const meta: Meta<typeof AboutUsAside> = {
    component: AboutUsAside,
};

export default meta;

type Story = StoryObj;

export const AboutUsLowerStory: Story = {
    name: 'AboutUsAside',

    render: () => <AboutUsAside />,
};
