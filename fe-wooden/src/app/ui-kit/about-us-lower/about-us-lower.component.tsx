"use client"

import React from "react"
import Image from "next/image"
import css from "./about-us-lower.module.css"
import ticTacToe from '../../../../public/img/short-information-section/ticTacToe.jpg';
import abacus from '../../../../public/img/short-information-section/abakus.jpg';
import jenga from '../../../../public/img/short-information-section/jengaAndKids.jpg';

const AboutUsLower = () =>{
    return(
        <div className={css.wrap}>
            <div className={css.element}>
                <Image
                    src={ticTacToe}
                    width={200}
                    height={200}
                    className={css.photo}
                    alt="game photo"
                />
                <p className={css.text}>
                    Roasting exquisite coffee while making an impact at origin and at home
                </p>
            </div>

            <div className={css.element}>
                <Image
                    src={abacus}
                    width={200}
                    height={200}
                    className={css.photo}
                    alt="game photo"
                />
                <p className={css.text}>
                    Roasting exquisite coffee while making an impact at origin and at home
                </p>
            </div>

            <div className={css.element}>
                <Image
                    src={jenga}
                    width={200}
                    height={200}
                    className={css.photo}
                    alt="game photo"
                />
                <p className={css.text}>
                    Roasting exquisite coffee while making an impact at origin and at home
                </p>
            </div>

        </div>
    );
};

export default AboutUsLower;