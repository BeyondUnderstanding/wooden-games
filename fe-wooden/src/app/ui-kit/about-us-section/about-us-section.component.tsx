/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import css from './about-us-section.module.css';
import ticTacToe from '../../../../public/img/short-information-section/ticTacToe.jpg';
import abacus from '../../../../public/img/short-information-section/abakus.jpg';
import jenga from '../../../../public/img/short-information-section/jengaAndKids.jpg';

const AboutUsSection = () => {
    return (
        <section className={css.wrap}>
            <div className={css.element}>
                <img
                    src={ticTacToe.src}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={css.photo}
                    alt="game photo"
                />

                <p className={css.text}>
                    Looking for a unique team-building experience? Our wooden
                    games provide an ideal platform for fostering teamwork,
                    communication, and camaraderie among colleagues.
                </p>
            </div>

            <div className={css.element}>
                <img
                    src={abacus.src}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={css.photo}
                    alt="game photo"
                />
                <p className={css.text}>
                    In a world dominated by smartphones, Wooden Games offers a
                    refreshing break. Step away from screens, immerse yourself
                    in the tactile pleasure of wooden games, and rediscover the
                    joy of genuine human connection.
                </p>
            </div>

            <div className={css.element}>
                <img
                    src={jenga.src}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={css.photo}
                    alt="game photo"
                />
                <p className={css.text}>
                    Our mission is to create an environment where people can
                    unplug, unwind, and connect in a meaningful way. We believe
                    in the power of play to bring out the best in individuals
                    and teams, fostering positive memories that last a lifetime.
                </p>
            </div>
        </section>
    );
};

export default AboutUsSection;
