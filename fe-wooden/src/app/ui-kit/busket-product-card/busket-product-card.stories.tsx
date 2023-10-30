import type { Meta, StoryObj } from '@storybook/react';
import {
    BasketProductCard,
    BasketProductCardProps,
} from './busket-product-card.component';
import productPhoto from './images/zigzag.png';

const meta: Meta<typeof BasketProductCard> = {
    component: BasketProductCard,
    argTypes: {
        src: {
            control: { type: 'file', accept: ['.png', '.svg', 'jpg', 'jpeg'] },
            isError: { control: 'boolean' },
        },
    },
};

export default meta;
type Story = StoryObj<BasketProductCardProps>;

export const BasketProductCardStory: Story = {
    name: 'BasketProductCard',
    args: {
        src: productPhoto,
        coast: 49,
        name: 'TikTak',
        disabled: false,
    },
    render: ({ ...args }) => <BasketProductCard {...args} />,
};
