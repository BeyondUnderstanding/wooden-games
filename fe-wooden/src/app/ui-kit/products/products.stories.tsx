import type { Meta, StoryObj } from '@storybook/react';
import { Products, ProductsProps } from './products.component';
import { productsBasket } from '../side-popup/popup.mock';
import src from '../busket-product-card/images/zigzag.png';

const meta: Meta<typeof Products> = {
    component: Products,
};

export default meta;
type Story = StoryObj<ProductsProps>;

export const ProductsStory: Story = {
    name: 'Products',
    args: {
        products: productsBasket.map((el) => ({ ...el, src })),
    },
    render: ({ ...args }) => {
        return <Products {...args} />;
    },
};
