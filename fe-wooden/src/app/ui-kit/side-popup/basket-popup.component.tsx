import { Button } from '../button/button.component';
import { PopupProps, SidePopupLayoutProps } from './side-popup.component';
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
import { ChosenDate } from '../layout/layout.component';
import { useRef } from 'react';
import { useOutsideClick } from '../../../utils/hooks';
import { injectable, token } from '@injectable-ts/core';

export interface Product extends Omit<BasketProductCardProps, 'onClick'> {
    id: number;
}

export interface BasketPopupProps
    extends Omit<
        SidePopupLayoutProps,
        | 'labelButton'
        | 'label'
        | 'onClickButton'
        | 'children'
        | 'isOpen'
        | 'onClose'
    > {
    readonly products: Array<Product>;
    readonly goToCheckRulse: () => void;
    readonly onClick: () => void;
    readonly onProductDelete: (id: number) => void;
    readonly chosenDate: Property<ChosenDate>;
}

/*
    min заказ 3 игры на 3 часа - нет скидки
    5 игр на 3 часа - 15% скидка + Менеджер
    3 игры на 5 часов - 15% скидка + Менеджер
    9 игр на 5 часов + 3d тик так + 30% скидки + 2 менеджера 
*/
export interface GetDiscount {
    discount: 0.85 | 0.7 | 0;
    menegers: 0 | 1 | 2;
}
const getDiscount = (products: Product[], h: number): GetDiscount => {
    if (products.length === 3 && h > 4) {
        return {
            discount: 0.85,
            menegers: 1,
        };
    }
    if (products.length > 4 && h > 2 && products.length < 8) {
        return {
            discount: 0.85,
            menegers: 1,
        };
    }
    if (products.length > 8 && h > 4) {
        return {
            discount: 0.7,
            menegers: 2,
        };
    }
    return {
        discount: 0,
        menegers: 0,
    };
};

export const BasketPopup = injectable(
    CalendarInputContainer,
    token('SidePopupControls')<PopupProps>(),
    (CalendarInputContainer, BasketPopup) =>
        ({
            goToCheckRulse,
            onClick,
            products,
            onProductDelete,
            chosenDate,
        }: BasketPopupProps) => {
            const { isOpen, onClose } = BasketPopup;
            // danger zone start
            const btnDateStateLavel = useProperty(chosenDate).label;
            const btnDateState =
                btnDateStateLavel?.includes(
                    new Date().getFullYear().toString()
                ) ||
                btnDateStateLavel?.includes(
                    (new Date().getFullYear() + 1).toString()
                );

            const clockHours = Number(
                useProperty(chosenDate).label?.split(',')[1].split('h')[0]
            );

            const clockHoursValidate = Number.isNaN(clockHours)
                ? 1
                : clockHours;
            // end zone

            const popupRef = useRef<HTMLDivElement | null>(null);
            useOutsideClick(popupRef, isOpen, onClose);

            return (
                <div className={cn({ [css.asideWrap]: isOpen })}>
                    <div className={cn({ [css.asideWrapBlure]: isOpen })} />
                    <aside
                        className={cn(css.aside, css.basket, {
                            [css.open]: isOpen,
                        })}
                        ref={popupRef}
                    >
                        <div className={css.asideHeader}>
                            <h1 className={css.headerLabel}>Your Cart</h1>
                            <span
                                className={css.headerSmallControl}
                                onClick={onClose}
                            >
                                Close
                            </span>
                        </div>
                        <div className={css.basketWrap}>
                            <div className={css.products}>
                                {products.map((el, i) => (
                                    <BasketProductCard
                                        onClick={() => onProductDelete(el.id)}
                                        {...el}
                                        key={el.name + '_' + el.src}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={css.infoWrap}>
                            <div>
                                <span>Your Date:</span>
                                <div>
                                    <CalendarInputContainer />
                                </div>
                            </div>
                            <BasketInfo
                                subtotal={
                                    products
                                        .map((el) => el.coast)
                                        .reduce((a, b) => a + b, 0) *
                                    clockHoursValidate
                                }
                                discount={getDiscount(
                                    products,
                                    clockHoursValidate
                                )}
                                delivery={15}
                            />
                            <Button
                                label={'Go to Checkout'}
                                onClick={onClick}
                                type={'def'}
                                //  я хз че тут происходит иначе оно не хочет работать
                                disabled={
                                    !(
                                        products.every((el) => !el.disabled) &&
                                        btnDateState == true &&
                                        products.length > 2
                                    )
                                }
                            />
                            <CheckRuls goToCheckRulse={goToCheckRulse} />
                        </div>
                    </aside>
                </div>
            );
        }
);
