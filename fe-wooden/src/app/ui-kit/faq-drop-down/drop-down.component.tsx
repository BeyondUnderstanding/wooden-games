'use client';
import React, { useState } from 'react';
import css from './drop-down.module.css';
import { DropDownIcon } from '../icons/drop-down-icon.component';

export interface DropDownProps {
    readonly qestion: string;
    readonly answer: JSX.Element;
}
const DropDown = ({ qestion, answer }: DropDownProps) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className={css.wrap} onClick={() => setOpen(!isOpen)}>
            <div className={css.titleWrap}>
                <h1 className={css.title}>{qestion}</h1>
                <div className={`${isOpen ? css.iconWrapOpen : css.iconWrap}`}>
                    <DropDownIcon />
                </div>
            </div>
            <div className={`${css.answerWrap} ${isOpen ? css.active : ''}`}>
                {answer}
            </div>
        </div>
    );
};

export default DropDown;
