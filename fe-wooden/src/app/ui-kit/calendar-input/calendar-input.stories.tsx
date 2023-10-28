import type { Meta, StoryObj } from '@storybook/react';
import { CalendarInput, CalendarInputProps } from './calendar-input.component';
import { CalendarInputContainer } from './calendar-input.container';

const meta: Meta<typeof CalendarInput> = {
    component: CalendarInput,
};

export default meta;
type Story = StoryObj<CalendarInputProps>;

export const CalendarStory: Story = {
    name: 'Calendar-input',
    args: {},
    render: ({ ...args }) => <CalendarInputContainer {...args} />,
};
