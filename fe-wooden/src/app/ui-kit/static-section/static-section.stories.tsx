import type { Meta, StoryObj } from '@storybook/react';
import { StaticSection } from './static-section.component';
import React from 'react';

const meta: Meta<typeof StaticSection> = {
    component: StaticSection,
};

export default meta;

type Story = StoryObj;

export const StaticSectionStory: Story = {
    name: 'StaticSection',

    render: () => <StaticSection />,
};
