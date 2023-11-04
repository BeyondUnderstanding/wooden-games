import type { Meta, StoryObj } from '@storybook/react';
import { AboutUsMain } from './about-us-main.component';

const meta: Meta<typeof AboutUsMain> = {
    component: AboutUsMain,
};

export default meta;

type Story = StoryObj;

export const AboutUsMainStory: Story = {
    name: 'AboutUsMain',

    render: () => <AboutUsMain />,
};
