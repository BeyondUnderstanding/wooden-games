'use client';

import React from 'react';
import Image from 'next/image';
import css from './about-us-section.module.css';
import ticTacToe from '../../../../public/img/short-information-section/ticTacToe.jpg';
import abacus from '../../../../public/img/short-information-section/abakus.jpg';
import jenga from '../../../../public/img/short-information-section/jengaAndKids.jpg';

const AboutUsSection = () => {
    return (
        <section className={css.wrap}>
            <div className={css.element}>
                <Image
                    src={ticTacToe}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={css.photo}
                    alt="game photo"
                />

                <p className={css.text}>
                    Roasting exquisite coffee while making an impact at origin
                    and at home
                </p>
            </div>

            <div className={css.element}>
                <Image
                    src={abacus}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={css.photo}
                    alt="game photo"
                />
                <p className={css.text}>
                    Roasting exquisite coffee while making an impact at origin
                    and at home
                </p>
            </div>

            <div className={css.element}>
                <Image
                    src={jenga}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={css.photo}
                    alt="game photo"
                />
                <p className={css.text}>
                    Roasting exquisite coffee while making an impact at origin
                    and at home
                </p>
            </div>
        </section>
    );
};

export default AboutUsSection;
