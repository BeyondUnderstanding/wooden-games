import { GetDiscount } from '../side-popup/basket-popup.component';
import css from './basket-info.module.css';
import cn from 'classnames';

export interface BasketInfoProps {
    readonly subtotal: number;
    readonly delivery: number;
    readonly discount: GetDiscount;
}

export const BasketInfo = ({
    subtotal: subtotalInit,
    delivery,
    discount,
}: BasketInfoProps) => {
    const subtotal =
        !!discount.discount && !Number.isNaN(discount.discount)
            ? Math.ceil(subtotalInit * discount.discount)
            : subtotalInit;
    return (
        <div className={css.wrap}>
            <div className={css.line}>
                <span>Subtotal</span>
                <span>
                    <span
                        className={cn({
                            [css.lineDepricated]: !!discount.discount,
                        })}
                    >
                        {subtotalInit} ₾
                    </span>
                    {!!discount.discount && (
                        <span className={css.discount}>{subtotal} ₾</span>
                    )}
                </span>
            </div>
            <div className={css.line}>
                <span>Delivery</span>
                <span>{delivery} ₾</span>
            </div>
            <div className={cn(css.line, css.bold)}>
                <span>Total</span>
                <span>{subtotal + delivery} ₾</span>
            </div>
        </div>
    );
};
