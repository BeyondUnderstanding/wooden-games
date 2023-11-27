import { useRouter } from 'next/navigation';
import { ProductCard } from '../product-card/product-card.component';
import { Product } from '../side-popup/basket-popup.component';
import css from './product-fratured.module.css';

interface ProductFraturedProps {
    readonly fratured: ReadonlyArray<Product>;
    readonly add2Basket: (product: Product) => void;
}

export const ProductFratured = ({
    fratured,
    add2Basket,
}: ProductFraturedProps) => {
    const router = useRouter();
    return (
        <div className={css.wrap}>
            <h2 className={css.headeLabel}>Other games</h2>
            <div className={css.wrapProducts}>
                {fratured.map((el) => (
                    <div
                        onClick={() => router.push(`/game/${el.id}`)}
                        key={el.coast + '_' + el.name + '_' + el.src}
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
        </div>
    );
};
