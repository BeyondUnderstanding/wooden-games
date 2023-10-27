import { Button } from '../button/button.component';
import { ArrowIcon } from '../icons/arrow-icon.component';
import { SidePopupLayoutProps } from './side-popup.component';
import css from './side-popup.module.css';
import cn from 'classnames';

export interface TextSidePopupProps
    extends Omit<SidePopupLayoutProps, 'children'> {
    readonly content?: JSX.Element | Array<JSX.Element>;
    readonly onClickBack: () => void;
}

export const TextSidePopup = ({
    label,
    labelButton,
    onClickButton,
    onClose,
    isOpen,
    content,
    onClickBack,
}: TextSidePopupProps) => {
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
                    <div className={css.textPage}>
                        {/* MOCK */}
                        {content}
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
