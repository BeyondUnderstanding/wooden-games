'use client';
import React, { useState } from 'react';
import css from './drop-down.module.css';
import cn from 'classnames';
import { DropDownIcon } from '../icons/drop-down-icon.component';

export interface DropDownProps {
    readonly question: string;
    readonly children: JSX.Element;
    readonly isWithoutBorder?: boolean;
}
const DropDown = ({ question, children, isWithoutBorder }: DropDownProps) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className={cn(css.wrap, { [css.delBorder]: isWithoutBorder })}>
            <div
                className={css.titleWrap}
                onClick={() => setOpen((isOpen) => !isOpen)}
            >
                <h2 className={css.title}>{question}</h2>
                <div
                    className={cn(css.iconWrapClose, {
                        [css.iconWrapOpen]: isOpen,
                    })}
                >
                    <DropDownIcon />
                </div>
            </div>
            <div
                className={cn(css.answerWrapClose, {
                    [css.answerWrapActive]: isOpen,
                })}
            >
                {children}
            </div>
        </div>
    );
};

export default DropDown;
