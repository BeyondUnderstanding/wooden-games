import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DropDown, { DropDownProps } from './drop-down.component';

const meta: Meta<typeof DropDown> = {
    component: DropDown,
    argTypes: {
        qestion: { control: 'text' },
    },
}

export default meta;
type Story = StoryObj<DropDownProps>;

export const DropDownStory: Story = {
    name: 'DropDown',
    args: {
        qestion: 'When do you roast and ship?',
        children: (
            <>
                <p>
                    An order placed through the Red Rooster website get roasted
                    and shipped to-order, typically on the following business
                    day. Orders shipped via USPS will leave our premises first
                    thing the following morning.
                </p>
                <p>
                    For example, if you place your order at 9am EST on Friday,
                    your order will roast on Monday and ship on Tuesday morning.
                    If you place your order Monday morning at 9am, it will roast
                    on Tuesday and ship on Wednesday.
                </p>
                <p>
                    Weekends, sales and holidays will often delay shipments by a
                    day or more.
                </p>
            </>
        ),
    },

    render: ({ ...args }) => <DropDown {...args} />,
};
