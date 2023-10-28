import { constVoid } from 'fp-ts/lib/function';
import { Button } from '../button/button.component';
import { CheckBox } from '../check-box/check-box.component';
import { ArrowIcon } from '../icons/arrow-icon.component';
import { Input } from '../input/input.component';
import { SidePopupLayoutProps } from './side-popup.component';
import css from './side-popup.module.css';
import cn from 'classnames';

export interface CheckOutPopupProps
    extends Omit<SidePopupLayoutProps, 'children'> {
    readonly onClickBack: () => void;
}

export const CheckOutPopup = ({
    label,
    labelButton,
    onClickButton,
    onClose,
    isOpen,
    onClickBack,
}: CheckOutPopupProps) => {
    return (
        <div className={cn({ [css.asideWrap]: isOpen })}>
            <div className={cn({ [css.asideWrapBlure]: isOpen })} />
            <aside className={cn(css.aside, { [css.open]: isOpen })}>
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
                            value={''}
                            placeholder={'Your name'}
                            onChenge={constVoid}
                        />
                        <Input
                            value={''}
                            placeholder={'Passport'}
                            onChenge={constVoid}
                        />
                        <Input
                            value={''}
                            placeholder={'Email'}
                            onChenge={constVoid}
                        />
                        <Input
                            value={''}
                            placeholder={'Phone'}
                            onChenge={constVoid}
                        />
                        <CheckBox getCheckedState={constVoid}>
                            <span>
                                I have read the{' '}
                                <span
                                    className={css.underline}
                                    onClick={() => {}}
                                >
                                    terms of the lease
                                </span>{' '}
                                and agree with them completely
                            </span>
                        </CheckBox>
                    </div>
                </div>
                <Button
                    label={labelButton}
                    onClick={onClickButton}
                    disabled={false}
                    type={'def'}
                />
            </aside>
        </div>
    );
};
