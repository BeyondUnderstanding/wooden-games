import type { Meta, StoryObj } from '@storybook/react';
import { BasketInfo, BasketInfoProps } from './basket-info.component';

const meta: Meta<typeof BasketInfo> = {
    component: BasketInfo,
};

export default meta;
type Story = StoryObj<BasketInfoProps>;

export const BasketInfoStory: Story = {
    name: 'product-characteristics',
    args: {
        subtotal: 112,
        delivery: 10,
    },
    render: ({ ...args }) => <BasketInfo {...args} />,
};
