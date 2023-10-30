'use client';

import { constVoid } from 'fp-ts/lib/function';
import { ProductCard } from '../product-card/product-card.component';
import { Product } from '../side-popup/basket-popup.component';
import css from './products.module.css';
import { StaticImageData } from 'next/image';

export interface ProductsProps {
    readonly products: Array<Product & { src: string | StaticImageData }>;
}

export const Products = ({ products }: ProductsProps) => {
    return (
        <section>
            <h1 className={css.label}>Game Collection</h1>
            <div className={css.wrapProducts}>
                {products.map((el) => (
                    <ProductCard
                        {...el}
                        onClick={constVoid}
                        key={el.coast + '_' + el.name + '_' + el.src}
                    />
                ))}
            </div>
        </section>
    );
};
