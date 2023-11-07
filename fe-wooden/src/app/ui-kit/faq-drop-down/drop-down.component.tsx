'use client';
import React, { useState } from 'react';
import css from './drop-down.module.css';
import cn from 'classnames';
import { DropDownIcon } from '../icons/drop-down-icon.component';

export interface DropDownProps {
    readonly qestion: string;
    readonly children: JSX.Element;
}
const DropDown = ({ qestion, children }: DropDownProps) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className={css.wrap}>
            <div
                className={css.titleWrap}
                onClick={() => setOpen((isOpen) => !isOpen)}
            >
                <h2 className={css.title}>{qestion}</h2>
                <div
                    className={cn({
                        [css.iconWrapOpen]: isOpen,
                        [css.iconWrapClose]: !isOpen,
                    })}
                >
                    <DropDownIcon />
                </div>
            </div>
            <div
                className={cn(css.answerWrap, {
                    [css.answerActive]: isOpen,
                    [css.AnswerClose]: !isOpen,
                })}
            >
                {children}
            </div>
        </div>
    );
};

export default DropDown;
