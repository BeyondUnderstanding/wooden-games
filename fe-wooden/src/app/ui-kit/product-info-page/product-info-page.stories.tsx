import type { Meta, StoryObj } from '@storybook/react';
import {
    ProductInfoPage,
    ProductInfoPageProps,
} from './product-info-page.component';
import { Characteristic } from '../product-characteristics/product-characteristics.component';
import { newLensedAtom } from '@frp-ts/lens';
import { ChosenDate } from '../layout/layout.component';

const meta: Meta<typeof ProductInfoPage> = {
    component: ProductInfoPage,
};

export default meta;
type Story = StoryObj<ProductInfoPageProps>;

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

const chosenDate = newLensedAtom<ChosenDate>({
    label: undefined,
    start: new Date(),
    end: new Date(),
});

export const ProductInfoPageStory: Story = {
    name: 'ProductInfoPage',
    args: {
        characteristics,
        chosenDate,
        setChosenDate: (x) => chosenDate.set(x),
        header: 'Gigantic Jenga',
    },
    render: ({ ...args }) => <ProductInfoPage {...args} />,
};
