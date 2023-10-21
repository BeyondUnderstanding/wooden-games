import type { Meta, StoryObj } from '@storybook/react';
import {
    Characteristic,
    ProductCharacteristics,
    ProductCharacteristicsProps,
} from './product-characteristics.component';

const meta: Meta<typeof ProductCharacteristics> = {
    component: ProductCharacteristics,
};

export default meta;
type Story = StoryObj<ProductCharacteristicsProps>;

const characteristics: Characteristic[] = [
    { label: 'Materials', value: 'Ash, Oak, plywood' },
    { label: 'Dimensions in the box', value: '92x30x30 cm' },
    {
        label: 'Dimensions of the tower at the beginning of the game',
        value: '84x24x24 cm',
    },
    { label: 'Brick dimensions ', value: '24x4,5 cm' },
    { label: 'Weight', value: '56 - 70kg' },
];

export const ProductCharacteristicsStory: Story = {
    name: 'product-characteristics',
    args: {
        characteristics,
    },
    render: ({ ...args }) => <ProductCharacteristics {...args} />,
};
