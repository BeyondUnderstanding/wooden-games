import type { Meta, StoryObj } from '@storybook/react';
import { AlarmIcon } from './alarm-icon.component';

const meta: Meta<typeof AlarmIcon> = {
    component: AlarmIcon,
};

export default meta;
type Story = StoryObj<{}>;

export const AlarmIconStory: Story = {
    name: 'AlarmIcon',
    render: ({ ...args }) => <AlarmIcon {...args} />,
};
