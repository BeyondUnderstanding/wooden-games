'use client';

import React from 'react';
import css from './burger-menu.module.css';
import Link from 'next/link';
import { SelectInputContainer } from '../select-input/select-input.container';
import { InputType } from '../select-input/select-input.component';

const BurgerMenu = () => {
    const languages: Array<InputType> = [
        { value: 1, label: 'English', isDisable: false },
        { value: 2, label: 'ქართული', isDisable: false },
    ];

    return (
        <div className={css.wrap}>
            <div className={css.linksWrap}>
                <Link href="/" className={css.link}>
                    Game Colection
                </Link>
                <Link href="/about-us" className={css.link}>
                    About Us
                </Link>
                <Link href="/rental-rules" className={css.link}>
                    Rental Rules
                </Link>{' '}
                {/* <--- is it tru href? */}
                <Link href="/faq" className={css.link}>
                    FAQ
                </Link>
            </div>
            <div className={css.social}>
                <Link href="/" className={css.network}>
                    Instagram
                </Link>
                <Link href="/" className={css.network}>
                    Facebook
                </Link>
            </div>

            <SelectInputContainer
                options={languages}
                initialLabel={'English'}
                onChange={() => {
                    console.log(`It's will changes the language`);
                }}
                notFillTimeError={false}
            />

            <p className={css.copyright}>
                Copyright © 2023 Wooden Games. All rights reserved.
            </p>
        </div>
    );
};

export default BurgerMenu;
