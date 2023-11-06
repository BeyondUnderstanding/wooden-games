'use client';
import React, { useState } from 'react';
import css from './drop-down.module.css';
import { DropDownIcon } from '../icons/drop-down-icon.component';

export interface DropDownProps {
    readonly qestion: string;
    readonly children: JSX.Element;
}
const DropDown = ({ qestion, children }: DropDownProps) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className={css.wrap}>
            <div className={css.titleWrap} onClick={() => setOpen(isOpen => !isOpen)}>
                <h1 className={css.title}>{qestion}</h1>
                <div className={`${isOpen ? css.iconWrapOpen : css.iconWrap}`}>
                    <DropDownIcon />
                </div>
            </div>
            <div className={`${css.answerWrap} ${isOpen ? css.answerActive : css.answerClose}`}>
                {children}
            </div>
        </div>
    );
};

export default DropDown;
