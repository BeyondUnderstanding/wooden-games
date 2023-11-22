'use client';

import React from 'react';
import css from './footer.module.css';
import Link from 'next/link';

interface FooterProps {
    readonly termsConditionsOpen: () => void;
}

export const Footer = ({ termsConditionsOpen }: FooterProps) => {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <div className={css.headline}>
                    <Link href="/" className={css.title}>
                        Wooden Games
                    </Link>
                    <span className={css.text}>
                        We will bring and install our precious wood games at
                        your event!
                    </span>
                </div>
                <div className={css.links}>
                    <div className={css.item}>
                        <p className={css.title}>Contact</p>
                        <Link
                            href="mailto:woodengamesge@gmail.com"
                            className={css.text}
                        >
                            woodengamesge@gmail.com
                        </Link>
                        {/* <Link href="tel:+995-325-432-432 " className={css.text}>
                            +995 (325) 432-432
                        </Link> */}
                        <p className={css.text}>English</p>
                    </div>
                    <div className={css.item}>
                        <p className={css.title}>Wooden Games</p>
                        <Link href="/" className={css.text}>
                            Products
                        </Link>
                        <Link href="/about-us" className={css.text}>
                            About Us
                        </Link>
                        {/* <Link href="/" className={css.text}>
                            Find Us
                        </Link> */}
                    </div>
                    <div className={css.item}>
                        <p className={css.title}>Information</p>
                        <Link href="/faq" className={css.text}>
                            FAQ — Rent and Return
                        </Link>
                        {/* <Link href="/" className={css.text}>
                            Users Review
                        </Link> */}
                        <span
                            className={css.text}
                            onClick={termsConditionsOpen}
                        >
                            Terms and conditions
                        </span>
                        {/* <Link href="/" className={css.text}>
                            Cookies Settings
                        </Link> */}
                    </div>
                    <div className={css.item}>
                        <p className={css.title}>Social</p>
                        <Link
                            href="https://www.instagram.com/woodengames_ge/"
                            target="_blank"
                            className={css.text}
                        >
                            Instagram
                        </Link>
                        <Link
                            href="https://www.facebook.com/woodengamesge"
                            target="_blank"
                            className={css.text}
                        >
                            Facebook
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <span className={css.copyright}>
                    Copyright © 2023 Craft Games. All rights reserved. <br />
                    Information about the cost of games and game sets for rent
                    is not a public offer and does not include self-employment
                    tax.Images of games in photos may differ from the originals.
                </span>
            </div>
        </footer>
    );
};
