import type { Meta, StoryObj } from '@storybook/react';
import productPhoto from './images/zigzag.png';
import { ProductCard, CardProps } from './product-card.component';

const meta: Meta<typeof ProductCard> = {
    component: ProductCard,
    argTypes: {
        disabled: { control: 'boolean' },
        name: { control: 'text' },
        coast: { control: 'number' },
        photo: {control: { type: 'file', accept: ['.png','.svg','jpg','jpeg']}},
        onClick: { action: 'clicked' },
    },
};

export default meta;
type Story = StoryObj<CardProps>;

const testOnClick = () => console.log('testClick on card');

export const CardStory: Story = {
    name: 'ProductCard',
    args: {
        disabled: false,
        name: 'ZigZag',
        coast: 56,
        photo: productPhoto,
        onClick: testOnClick,
    },

    render: ({ ...args }) => <ProductCard {...args} />,
};
