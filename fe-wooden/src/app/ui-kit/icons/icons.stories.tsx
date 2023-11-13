import type { Meta, StoryObj } from '@storybook/react';
import { AlarmIcon } from './alarm-icon.component';
import { ArrowIcon, ArrowIconLeft } from './arrow-icon.component';
import { CloseIcon } from './close-icon.component';
import { DropDownIcon} from './drop-down-icon.component';

const meta: Meta<typeof AlarmIcon> = {
    component: AlarmIcon,
};

export default meta;
type Story = StoryObj<{}>;

export const AlarmIconStory: Story = {
    name: 'AlarmIcon',
    render: ({ ...args }) => <AlarmIcon {...args} />,
};

export const ArrowIconStory: Story = {
    name: 'ArrowIcon',
    render: ({ ...args }) => <ArrowIcon {...args} />,
};

export const ArrowIconLeftStory: Story = {
    name: 'ArrowIconLeft',
    render: ({ ...args }) => <ArrowIconLeft {...args} />,
};

export const CloseIconStory: Story = {
    name: 'CloseIcon',
    render: ({ ...args }) => <CloseIcon {...args} />,
};

export const DropDownIconStory: Story = {
    name: 'DropDownIconIcon',
    render: ({ ...args }) => <DropDownIcon {...args} />,
};
