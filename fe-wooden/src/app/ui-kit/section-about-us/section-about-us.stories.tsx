import type { Meta, StoryObj } from '@storybook/react';
import { AboutUs } from './section-about-us.component';

const meta: Meta<typeof AboutUs> = {
    component: AboutUs,
};

export default meta;

type Story = StoryObj;

export const AboutUsStory: Story = {
    name: 'AboutUs',

    render: () => <AboutUs />,
};
