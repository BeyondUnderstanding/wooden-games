'use client';

import { ProductCard } from '../product-card/product-card.component';
import { Product } from '../side-popup/basket-popup.component';
import { useRouter } from 'next/navigation';
import css from './products.module.css';

export interface ProductsProps {
    readonly products: Array<Product>;
    readonly add2Basket: (product: Product) => void;
}

export const Products = ({ products, add2Basket }: ProductsProps) => {
    const router = useRouter();
    return (
        <section>
            <h1 className={css.label}>Game Collection</h1>
            <div className={css.wrapProducts}>
                {products.map((el) => (
                    <div
                        onClick={() => router.push(`/game/${el.id}`)}
                        key={el.coast + '_' + el.name}
                    >
                        <ProductCard
                            {...el}
                            onClick={() => {
                                add2Basket(el);
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};
