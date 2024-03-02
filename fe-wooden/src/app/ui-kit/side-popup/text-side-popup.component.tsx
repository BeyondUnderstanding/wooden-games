import { useRef } from 'react';
import { useOutsideClick } from '../../../utils/hooks';
import { Button } from '../button/button.component';
import { ArrowIcon } from '../icons/arrow-icon.component';
import { PopupProps, SidePopupLayoutProps } from './side-popup.component';
import css from './side-popup.module.css';
import cn from 'classnames';
import { injectable, token } from '@injectable-ts/core';

export interface TextSidePopupProps
    extends Omit<
        SidePopupLayoutProps,
        'children' | 'isOpen' | 'onClose' | 'onClickButton'
    > {
    readonly content?: JSX.Element;
    readonly onClickBack: () => void;
}

export const TextSidePopup = injectable(
    token('SidePopupControls')<PopupProps>(),
    (BasketPopup) =>
        ({ label, labelButton, content, onClickBack }: TextSidePopupProps) => {
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
                        <div className={css.asideContentWrap}>
                            <div className={css.asideHeader}>
                                <h1
                                    className={css.headerSmallControl}
                                    onClick={onClickBack}
                                >
                                    <ArrowIcon />
                                    Back
                                </h1>
                                <span
                                    className={css.headerSmallControl}
                                    onClick={onClose}
                                >
                                    Close
                                </span>
                            </div>
                            <h1 className={css.headerLabel}>{label}</h1>
                            <div className={css.textPage}>{content}</div>
                        </div>
                        <Button
                            label={labelButton}
                            onClick={onClose}
                            disabled={false}
                            type={'def'}
                        />
                    </aside>
                </div>
            );
        }
);
