/* eslint-disable @next/next/no-img-element */
import css from './busket-product-card.module.css';
import { Button } from '../button/button.component';

export interface BasketProductCardProps {
    readonly src: string;
    readonly coast: number;
    readonly name: string;
    readonly disabled: boolean;
    readonly onClick: () => void;
}

export const BasketProductCard = ({
    src,
    coast,
    name,
    disabled = false,
    onClick,
}: BasketProductCardProps) => {
    return (
        <div className={css.wrap}>
            <img
                src={src}
                width={0}
                height={0}
                className={css.image}
                sizes="100vw"
                alt="Game picture"
            />
            <div className={css.infoWrap}>
                <div className={css.info}>
                    <span className={css.name}>{name}</span>
                    <span className={css.coast}>{`${coast}.00`} ₾ / h</span>
                </div>
                <div className={css.controll}>
                    <Button
                        label={'Delete'}
                        onClick={onClick}
                        disabled={false}
                        type={disabled ? 'error' : 'link'}
                    />
                    {disabled && (
                        <span className={css.unavailable}>
                            Unavailable on this date
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
