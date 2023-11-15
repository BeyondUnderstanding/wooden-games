'use client';

import css from './product-card.module.css';
import cn from 'classnames';
import Image from 'next/image';
import { Button } from '../button/button.component';

export interface CardProps {
    readonly disabled: boolean;
    readonly name: string;
    readonly coast: number;
    readonly onClick: () => void;
    readonly src: string;
}

export const ProductCard = ({
    disabled,
    name,
    coast,
    onClick,
    src,
}: CardProps) => {
    return (
        <div className={css.wrap}>
            <Image
                src={src}
                width={0}
                height={0}
                sizes="100vw"
                className={css.image}
                alt="Game picture"
                style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '549px',
                }}
            />
            <div className={css.lowerBar}>
                <div>
                    <p className={css.name}>{name}</p>
                    <p
                        className={cn(css.coast, {
                            [css.coastError]: disabled,
                        })}
                    >
                        {disabled ? `Unavailable on this date` : `${coast} ₾`}
                    </p>
                </div>
                <div className={css.lowerButton}>
                    <Button
                        disabled={disabled}
                        label={'Add to Card'}
                        onClick={onClick}
                        type={'def'}
                    />
                </div>
            </div>
        </div>
    );
};
