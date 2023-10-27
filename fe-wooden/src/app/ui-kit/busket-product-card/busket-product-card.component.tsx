import Image, { StaticImageData } from 'next/image';
import css from './busket-product-card.module.css';
import { Button } from '../button/button.component';

export interface BasketProductCardProps {
    readonly src: string | StaticImageData;
    readonly price: number;
    readonly name: string;
    readonly isError: boolean;
    readonly onClick: () => void;
}

const IMG_SIZE = 120;

export const BasketProductCard = ({
    src,
    price,
    name,
    isError = false,
    onClick,
}: BasketProductCardProps) => {
    return (
        <div className={css.wrap}>
            <Image
                src={src}
                width={IMG_SIZE}
                height={IMG_SIZE}
                className={css.image}
                alt="Game picture"
            />
            <div className={css.infoWrap}>
                <div className={css.info}>
                    <span>{name}</span>
                    <span>{`${price}.00`} ₾ / h</span>
                </div>
                <div className={css.controll}>
                    <Button
                        label={'Delete'}
                        onClick={onClick}
                        disabled={false}
                        type={isError ? 'error' : 'link'}
                    />
                    {isError && (
                        <span className={css.unavailable}>
                            Unavailable on this date
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
