'use client';

import css from './card.module.css';
import cn from 'classnames';
import Image from 'next/image';
import gamePhoto from './images/zigzag.png';
import { Button } from '../button/button.component';

export interface CardProps {
   readonly disabled: boolean;
   readonly name: string;
   readonly coast: number;
   readonly onClick: () => void,
   readonly photo: string; 
}

export const Card = ({
    disabled,
    name = 'ZigZag',
    coast = 56,
    onClick,
    photo = gamePhoto
}: CardProps) => {
    return (
        <div className={css.wrap}>
            <Image
                src={photo}
                width={549}
                height={518}
                className={css.image}
                alt="Game picture"
            />
            <div className={css.loverBar}>
                <div className={css.loverText}>
                    <p className={css.name}>{name}</p>
                    <p
                        className={cn(css.coast, {
                            [css.coastError]: disabled,
                        })}
                    >
                        {disabled ? `Unavailable on this date` : `${coast} ₾`}
                    </p>
                </div>
                <div className={css.loverButton}>
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
