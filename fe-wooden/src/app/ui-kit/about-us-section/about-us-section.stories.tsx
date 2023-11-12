import type { Meta, StoryObj } from '@storybook/react';
import AboutUsSection from './about-us-section.component';
import React from 'react';

const meta: Meta<typeof AboutUsSection> = {
    component: AboutUsSection,
};

export default meta;

type Story = StoryObj;

export const AboutUsLowerStory: Story = {
    name: 'AboutUsAside',

    render: () => <AboutUsSection />,
};
