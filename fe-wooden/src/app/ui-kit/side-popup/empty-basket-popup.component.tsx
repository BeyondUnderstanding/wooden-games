import { useRef } from 'react';
import { useOutsideClick } from '../../../utils/hooks';
import { Button } from '../button/button.component';
import { BasketIcon } from '../icons/basket-icon.component';
import { PopupProps, SidePopupLayoutProps } from './side-popup.component';
import css from './side-popup.module.css';
import cn from 'classnames';
import { injectable, token } from '@injectable-ts/core';

export interface EmptyBasketPopupProps
    extends Omit<SidePopupLayoutProps, 'children' | 'onClickButton'> {}

export const EmptyBasketPopup = injectable(
    token('SidePopupControls')<PopupProps>(),
    (BasketPopup) =>
        ({ label, labelButton }: EmptyBasketPopupProps) => {
            const { isOpen, onClose } = BasketPopup;

            const popupRef = useRef<HTMLDivElement | null>(null);
            useOutsideClick(popupRef, isOpen, onClose);
            return (
                <div className={cn({ [css.asideWrap]: isOpen })}>
                    <div className={cn({ [css.asideWrapBlure]: isOpen })} />
                    <aside
                        className={cn(css.aside, { [css.open]: isOpen })}
                        ref={popupRef}
                    >
                        <div className={css.asideHeader}>
                            <h1 className={css.headerLabel}>{label}</h1>
                            <span
                                className={css.headerSmallControl}
                                onClick={onClose}
                            >
                                Close
                            </span>
                        </div>
                        <div className={css.emptyBasskedWrapContent}>
                            <BasketIcon />
                            <span>Theres nothing in your cart</span>
                        </div>
                        <Button
                            label={labelButton}
                            onClick={onClose}
                            type={'def'}
                            disabled={false}
                        />
                    </aside>
                </div>
            );
        }
);
