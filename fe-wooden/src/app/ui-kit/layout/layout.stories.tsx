import type { Meta, StoryObj } from '@storybook/react';
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
