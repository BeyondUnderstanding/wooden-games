'use client';

import css from './about-us-main.module.css';
import Image from 'next/image';
import ticTacToe from '../../../../public/img/short-information-section/ticTacToe.jpg';
import balls from '../../../../public/img/short-information-section/chainBalls.jpg';

export const AboutUsMain = () => {
    return (
        <section className={css.wrap}>
            <h1 className={css.title}>About Us</h1>
            <div className={css.content}>
                <div className={css.element}>
                    <div className={css.heading}>
                        <h3 className={css.caption}>
                            Welcome to Wooden Games - Where Fun Meets Tradition!
                        </h3>
                        <p className={css.text}>
                            We believe in bringing people together through the
                            timeless joy of wooden games. Our passion lies in
                            creating memorable moments, fostering connections,
                            and adding a touch of nostalgia to your events.
                        </p>
                        <h3 className={css.caption}>What We Offer</h3>
                        <p className={css.text}>
                            Our diverse selection of wooden games caters to a
                            wide audience, from family gatherings to corporate
                            teambuilding events. Clients have the opportunity to
                            rent our games by the hour, ensuring flexible and
                            affordable entertainment solutions.
                        </p>
                        <h3 className={css.caption}>Fun and Engagement:</h3>
                        <p className={css.text}>
                            Our games are designed to spark joy, laughter, and
                            friendly competition. They serve as the perfect
                            icebreaker, encouraging guests to interact and enjoy
                            each other&apos;s company.
                        </p>
                    </div>
                    <Image
                        width={800}
                        height={560}
                        src={ticTacToe}
                        className={css.photo}
                        alt="game photo"
                    />
                </div>
                <div className={css.element}>
                    <Image
                        width={800}
                        height={560}
                        src={balls}
                        className={css.photo}
                        alt="game photo"
                    />
                    <div className={css.heading}>
                        <h3 className={css.caption}>Let&apos;s Play!</h3>
                        <p className={css.text}>
                            Whether you&apos;re hosting a birthday party, a
                            corporate event, or a wedding celebration, Wooden
                            Games is here to elevate your experience. Join us in
                            rediscovering the joy of traditional wooden games –
                            where every move, every laugh, and every victory
                            contribute to a truly unforgettable occasion.
                        </p>
                        <h3 className={css.caption}>
                            Seamless Booking Experience
                        </h3>
                        <p className={css.text}>
                            To make your experience even more convenient, we
                            offer a user-friendly online booking platform.
                            Browse through our collection of games, choose your
                            favorites, and book them directly through our
                            website. Our streamlined process ensures that you
                            can secure the games you love with just a few
                            clicks.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
