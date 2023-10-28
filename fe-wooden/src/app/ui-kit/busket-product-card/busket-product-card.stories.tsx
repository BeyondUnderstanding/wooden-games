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
        price: 49,
        name: 'TikTak',
        isError: false,
    },
    render: ({ ...args }) => <BasketProductCard {...args} />,
};
