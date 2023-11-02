import type { Meta, StoryObj } from '@storybook/react';
import {
    CalendarInputContainer,
    CalendarInputContainerProps,
} from './calendar-input.container';
import { newLensedAtom } from '@frp-ts/lens';

const meta: Meta<typeof CalendarInputContainer> = {
    component: CalendarInputContainer,
};

export default meta;
type Story = StoryObj<CalendarInputContainerProps>;

export const CalendarStory: Story = {
    name: 'Calendar-input',
    args: {
        chosenDate: newLensedAtom(''),
        setChosenDate: (x: string) => {},
    },
    render: (args) => <CalendarInputContainer {...args} />,
};
