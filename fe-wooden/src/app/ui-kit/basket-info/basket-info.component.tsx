import css from './basket-info.module.css';
import cn from 'classnames';

export interface BasketInfoProps {
    subtotal: number;
    delivery: number;
}

export const BasketInfo = ({ subtotal, delivery }: BasketInfoProps) => {
    return (
        <div className={css.wrap}>
            <div className={css.line}>
                <span>Subtotal</span>
                <span>{subtotal} ₾</span>
            </div>
            <div className={css.line}>
                <span>Delivery</span>
                <span>{delivery} ₾</span>
            </div>
            <div className={cn(css.line, css.bold)}>
                <span>Total</span>
                <span>{subtotal + delivery}  ₾</span>
            </div>
        </div>
    );
};
