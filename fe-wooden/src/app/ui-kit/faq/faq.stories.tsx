import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Faq from './faq.component';

const meta: Meta<typeof Faq> = {
    component: Faq,
};

export default meta;

type Story = StoryObj;

export const FaqStory: Story = {
    name: 'Faq',

    render: () => <Faq />,
};
