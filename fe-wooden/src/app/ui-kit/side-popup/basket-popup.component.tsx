import { Button } from '../button/button.component';
import { SidePopupLayoutProps } from './side-popup.component';
import css from './side-popup.module.css';
import cn from 'classnames';
import { BasketInfo } from '../basket-info/basket-info.component';
import { CheckRuls } from '../check-ruls/check-ruls.component';
import {
    BasketProductCard,
    BasketProductCardProps,
} from '../busket-product-card/busket-product-card.component';
import { useState } from 'react';
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';

export interface ProductBasket extends Omit<BasketProductCardProps, 'onClick'> {
    id: string;
}

export interface BasketPopupProps
    extends Omit<
        SidePopupLayoutProps,
        'labelButton' | 'label' | 'onClickButton' | 'children'
    > {
    readonly products: Array<ProductBasket>;
    readonly goToCheckRulse: () => void;
    readonly onClick: () => void;
    readonly onProductDelete: (id: string) => void;
}

export const BasketPopup = ({
    onClose,
    isOpen,
    goToCheckRulse,
    onClick,
    products,
    onProductDelete,
}: BasketPopupProps) => {
    const [date, setDate] = useState<Date | undefined>();
    return (
        <div className={cn({ [css.asideWrap]: isOpen })}>
            <div className={cn({ [css.asideWrapBlure]: isOpen })} />
            <aside className={cn(css.aside, { [css.open]: isOpen })}>
                <div className={css.asideHeader}>
                    <h1 className={css.headerLabel}>Your Cart</h1>
                    <span className={css.headerSmallControl} onClick={onClose}>
                        Close
                    </span>
                </div>
                <div className={css.basketWrap}>
                    <div className={css.products}>
                        {products.map((el, i) => (
                            <BasketProductCard
                                onClick={() => onProductDelete(el.id)}
                                {...el}
                                // зер нот гуд
                                key={el.name + '_' + i}
                            />
                        ))}
                    </div>
                    <div>
                        <span>Your Date:</span>
                        <div>
                            <CalendarInputContainer
                                isBasket={true}
                                finalDate={(date) => setDate(date)}
                            />
                        </div>
                    </div>
                    <BasketInfo
                        subtotal={products
                            .map((el) => el.price)
                            .reduce((a, b) => a + b, 0)}
                        delivery={10}
                    />
                </div>
                <Button
                    label={'Go to Checkout'}
                    onClick={onClick}
                    type={'def'}
                    disabled={!products.every((el) => !el.isError) || !date}
                />
                <CheckRuls goToCheckRulse={goToCheckRulse} />
            </aside>
        </div>
    );
};
