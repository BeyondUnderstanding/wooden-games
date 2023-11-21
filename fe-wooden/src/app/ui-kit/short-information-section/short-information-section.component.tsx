'use client';

import React from 'react';
import css from './short-information-section.module.css';
import { ImageBox } from './image-box';

export const ShortInformation = () => {
    return (
        <div className={css.wrap}>
            <div className={css.note}>
                <h1 className={css.title}>Wooden Games at your event!</h1>
                <p className={css.text}>
                    We believe in bringing people together through the timeless
                    joy of wooden games. Our passion lies in creating memorable
                    moments, fostering connections, and adding a touch of
                    nostalgia to your events.
                </p>
            </div>

            <ImageBox />

            <div className={css.note}>
                <h1 className={css.title}>
                    Forget about gadgets and make the most of reality!
                </h1>
                <p className={css.text}>
                    In a world dominated by smartphones, Wooden Games offers a
                    refreshing break. Step away from screens, immerse yourself
                    in the tactile pleasure of wooden games, and rediscover the
                    joy of genuine human connection.
                </p>
            </div>
        </div>
    );
};
