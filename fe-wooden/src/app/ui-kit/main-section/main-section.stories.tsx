import type { Meta, StoryObj } from '@storybook/react';
import { MainSection } from './main-section.component';

const meta: Meta<typeof MainSection> = {
    component: MainSection,
};

export default meta;

type Story = StoryObj;

export const MainSectionStory: Story = {
    name: 'MainSection',

    render: () => <MainSection />,
};
