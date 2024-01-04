import { Button } from '../button/button.component';
import { CheckBox } from '../check-box/check-box.component';
import { ArrowIcon } from '../icons/arrow-icon.component';
import { Input } from '../input/input.component';
import { SidePopupLayoutProps } from './side-popup.component';
import css from './side-popup.module.css';
import cn from 'classnames';
import { useRef, useState } from 'react';
import { useOutsideClick } from '../../../utils/hooks';

export interface FormDataField {
    readonly data: string | undefined;
    readonly isValid: boolean;
}

export interface FormData {
    readonly name: FormDataField;
    readonly passport: FormDataField;
    readonly email: FormDataField;
    readonly phone: FormDataField;
    readonly deliveryAddress: FormDataField;
    readonly comment: FormDataField;
}

export interface CheckOutPopupProps
    extends Omit<SidePopupLayoutProps, 'children' | 'onClickButton'> {
    readonly onClickButton: (
        typePayment: 'cryptocom' | 'prepayment' | 'paypal'
    ) => void;
    readonly onClickBack: () => void;
    readonly goToRulse: () => void;
    readonly formData: FormData;
    readonly updateFormData: (data: Partial<FormData>) => void;
}

export const CheckOutPopup = ({
    label,
    labelButton,
    onClickButton,
    onClose,
    isOpen,
    onClickBack,
    goToRulse,
    formData,
    updateFormData,
}: CheckOutPopupProps) => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [checkboxState, setCheckboxState] = useState(false);
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
                    <div className={css.checkoutWrapContent}>
                        <Input
                            value={formData.name}
                            placeholder={'Your name'}
                            onChenge={(e) =>
                                updateFormData({
                                    name: {
                                        data: e,
                                        isValid: formData.name.isValid,
                                    },
                                })
                            }
                        />
                        <Input
                            value={formData.passport}
                            placeholder={'Passport'}
                            onChenge={(e) =>
                                updateFormData({
                                    passport: {
                                        data: e,
                                        isValid: formData.passport.isValid,
                                    },
                                })
                            }
                        />
                        <Input
                            value={formData.email}
                            placeholder={'Email'}
                            onChenge={(e) =>
                                updateFormData({
                                    email: {
                                        data: e,
                                        isValid: formData.email.isValid,
                                    },
                                })
                            }
                        />
                        <Input
                            value={formData.phone}
                            placeholder={'Phone'}
                            onChenge={(e) =>
                                updateFormData({
                                    phone: {
                                        data: e,
                                        isValid: formData.phone.isValid,
                                    },
                                })
                            }
                        />
                        <Input
                            value={formData.deliveryAddress}
                            placeholder={'Delivery address'}
                            onChenge={(e) =>
                                updateFormData({
                                    deliveryAddress: {
                                        data: e,
                                        isValid:
                                            formData.deliveryAddress.isValid,
                                    },
                                })
                            }
                        />
                        <Input
                            value={formData.comment}
                            placeholder={'Comment'}
                            onChenge={(e) =>
                                updateFormData({
                                    comment: {
                                        data: e,
                                        isValid: formData.comment.isValid,
                                    },
                                })
                            }
                        />
                        <CheckBox getCheckedState={(x) => setCheckboxState(x)}>
                            <span>
                                I have read the{' '}
                                <span
                                    className={css.underline}
                                    onClick={goToRulse}
                                >
                                    terms of the lease
                                </span>{' '}
                                and agree with them completely
                            </span>
                        </CheckBox>
                    </div>
                </div>
                <div className={css.controls}>
                    <Button
                        label={'Payment via crypto'}
                        onClick={() => onClickButton('cryptocom')}
                        disabled={!checkboxState}
                        type={'def'}
                        theme={[css.btn]}
                    />

                    <Button
                        label={'Payment via paypal'}
                        onClick={() => onClickButton('paypal')}
                        disabled={!checkboxState}
                        type={'def'}
                        theme={[css.btn]}
                    />

                    <Button
                        label={'Payment via manager'}
                        onClick={() => onClickButton('prepayment')}
                        disabled={!checkboxState}
                        type={'def'}
                        theme={[css.btn]}
                    />
                </div>
            </aside>
        </div>
    );
};
