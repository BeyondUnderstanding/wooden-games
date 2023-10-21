import type { Meta, StoryObj } from '@storybook/react';
import { CheckRuls, CheckRulsProps } from './check-ruls.component';

const meta: Meta<typeof CheckRuls> = {
    component: CheckRuls,
};

export default meta;
type Story = StoryObj<CheckRulsProps>;

export const CheckRulsStory: Story = {
    name: 'CheckRuls',
    render: ({ ...args }) => <CheckRuls {...args} />,
};
