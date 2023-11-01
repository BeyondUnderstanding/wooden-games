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
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';
import { Property } from '@frp-ts/core';
import { useProperty } from '@frp-ts/react';

export interface Product extends Omit<BasketProductCardProps, 'onClick'> {
    id: string;
}

export interface BasketPopupProps
    extends Omit<
        SidePopupLayoutProps,
        'labelButton' | 'label' | 'onClickButton' | 'children'
    > {
    readonly products: Array<Product>;
    readonly goToCheckRulse: () => void;
    readonly onClick: () => void;
    readonly onProductDelete: (id: string) => void;
    readonly chosenDate: Property<string>;
    readonly setChosenDate: (x: string) => void;
}

export const BasketPopup = ({
    onClose,
    isOpen,
    goToCheckRulse,
    onClick,
    products,
    onProductDelete,
    chosenDate,
    setChosenDate,
}: BasketPopupProps) => {
    const btnDateState = useProperty(chosenDate).includes(
        new Date().getFullYear().toString()
    );

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
                                chosenDate={chosenDate}
                                setChosenDate={setChosenDate}
                            />
                        </div>
                    </div>
                    <BasketInfo
                        subtotal={products
                            .map((el) => el.coast)
                            .reduce((a, b) => a + b, 0)}
                        delivery={10}
                    />
                </div>
                <Button
                    label={'Go to Checkout'}
                    onClick={onClick}
                    type={'def'}
                    //  я хз че тут происходит иначе оно не хочет работать
                    disabled={
                        !(
                            products.every((el) => !el.disabled) &&
                            btnDateState == true
                        )
                    }
                />
                <CheckRuls goToCheckRulse={goToCheckRulse} />
            </aside>
        </div>
    );
};
