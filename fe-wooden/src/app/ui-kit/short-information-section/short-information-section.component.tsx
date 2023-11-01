'use client';

import React from 'react';
import css from './short-information-section.module.css';
import Image, { StaticImageData } from 'next/image';
import abacus from '../../../../public/img/abakus.jpg';
import balls from '../../../../public/img/chainBalls.jpg';
import jenga from '../../../../public/img/jengaAndKids.jpg';
import ticTacToe from '../../../../public/img/ticTacToe.jpg';

export const ShortInformation = () => {
    const showImage = (src: string | StaticImageData) => {
        return (
            <Image
                src={src}
                width={740}
                height={540}
                className={css.photo}
                alt={'game picture'}
            />
        );
    };
    return (
        <div className={css.wrap}>
            <div className={css.note}>
                <h1 className={css.title}>Games from England at your event!</h1>
                <p className={css.text}>
                    The birthplace of wooden games is rightly considered
                    to be England. Conservative yet progressive, it was England
                    that gave the world the famous game of Jenga! The English
                    love of this kind of game dates back to the kingdom’s
                    distant past.
                </p>
                <p className={css.text}>
                    But, if in the old days this pastime could only be afforded
                    by members of the upper classes, now it’s available
                    to everyone!
                </p>
            </div>
            <div className={css.images}>
                
                    {showImage(jenga)}
                    {showImage(balls)}
               
                
                    {showImage(ticTacToe)}
                    {showImage(abacus)}
                
            </div>
            <div className={css.note}>
                <h1 className={css.title}>
                    Forget about gadgets and make the most of reality!
                </h1>
                <p className={css.text}>
                    We will bring and install our precious wood games at your
                    event! Depending on the format of the event and the venue,
                    we will select a set of games that will be a great addition
                    to your celebration! Our manager will help, advise, teach
                    and keep you company in the game!
                </p>
            </div>
        </div>
    );
};
