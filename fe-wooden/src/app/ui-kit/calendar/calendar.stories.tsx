import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, CalendarProps } from './calendar.component';
import { constVoid } from 'fp-ts/lib/function';

const meta: Meta<typeof Calendar> = {
    component: Calendar,
};

export default meta;
type Story = StoryObj<CalendarProps>;

export const CalendarStory: Story = {
    name: 'Calendar',
    args: {
        onClose: constVoid,
        onSelectDate: constVoid,
        occupiedDates: [
            new Date(23, 9, 2),
            new Date(23, 9, 22),
            new Date(23, 9, 23),
            new Date(23, 9, 30),
        ],
    },
    render: ({ ...args }) => <Calendar {...args} />,
};
