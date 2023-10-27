import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer.component';

const meta: Meta<typeof Footer> = {
    component: Footer,
};

export default meta;

type Story = StoryObj;

export const FooterStory: Story = {
    name: 'Footer',

    render: () => <Footer />,
};
