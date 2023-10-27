import type { Meta, StoryObj } from '@storybook/react';
import { constVoid } from 'fp-ts/lib/function';
import {
    CalendarContainer,
    CalendarContainerProps,
} from './calendar.container';

const meta: Meta<typeof CalendarContainer> = {
    component: CalendarContainer,
};

export default meta;
type Story = StoryObj<CalendarContainerProps>;

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
        selectDate: new Date(),
        initialStartLabel: 'Start',
        initialEndLabel: 'End',
    },
    render: ({ ...args }) => <CalendarContainer {...args} />,
};
