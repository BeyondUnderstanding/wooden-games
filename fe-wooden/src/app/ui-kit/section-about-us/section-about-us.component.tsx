'use client';

import css from './section-about-us.module.css';
import Image from 'next/image';
import ticTacToe from '../../../../public/img/short-information-section/ticTacToe.jpg';


export const AboutUs = () => {
    return (
        <div className={css.wrap}>
            <h1 className={css.title}>About Us</h1>
            <div className={css.content}>
                <div className={css.element}>
                    <div className={css.heading}>
                        <h2 className={css.title}>
                            Roasting exquisite coffee while making an impact at
                            origin and at home
                        </h2>
                        <p className={css.text}>
                            The birthplace of wooden games is rightly considered
                            to be England. Conservative yet progressive, it was
                            England that gave the world the famous game
                            of Jenga! The English love of this kind of game
                            dates back to the kingdom’s distant past.2
                        </p>
                    </div>
                    <Image
                        width={820}
                        height={580}
                        src = {ticTacToe}
                        className={css.photo}
                        alt='game photo'
                    />
                </div>
            </div>
        </div>
    );
};
