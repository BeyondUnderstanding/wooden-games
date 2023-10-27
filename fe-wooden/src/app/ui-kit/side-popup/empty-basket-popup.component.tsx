import { Button } from '../button/button.component';
import { BasketIcon } from '../icons/basket-icon.component';
import { SidePopupLayoutProps } from './side-popup.component';
import css from './side-popup.module.css';
import cn from 'classnames';

export interface EmptyBasketPopupProps
    extends Omit<SidePopupLayoutProps, 'children'> {}

export const EmptyBasketPopup = ({
    label,
    labelButton,
    onClickButton,
    onClose,
    isOpen,
}: EmptyBasketPopupProps) => {
    return (
        <div className={cn({ [css.asideWrap]: isOpen })}>
            <div className={cn({ [css.asideWrapBlure]: isOpen })} />
            <aside className={cn(css.aside, { [css.open]: isOpen })}>
                <div className={css.asideHeader}>
                    <h1 className={css.headerLabel}>{label}</h1>
                    <span className={css.headerSmallControl} onClick={onClose}>
                        Close
                    </span>
                </div>
                <div className={css.emptyBasskedWrapContent}>
                    <BasketIcon />
                    <span>Theres nothing in your cart</span>
                </div>
                <Button
                    label={labelButton}
                    onClick={onClickButton}
                    type={'def'}
                    disabled={false}
                />
            </aside>
        </div>
    );
};
