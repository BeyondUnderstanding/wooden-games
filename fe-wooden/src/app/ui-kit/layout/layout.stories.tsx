import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useMergeState } from '../../../utils/hooks';
import { Layout } from './layout.component';

const meta: Meta<typeof Layout> = {
    component: Layout,
};

export default meta;
type Story = StoryObj<{}>;

export const LayoutStory: Story = {
    name: 'Layout',
    render: ({ ...args }) => {
        return <Layout />;
    },
};
