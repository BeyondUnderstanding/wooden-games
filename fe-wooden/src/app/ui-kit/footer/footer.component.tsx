'use client';

import css from './footer.module.css';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className={css.wrap}>
            <div className={css.line} />

            <div className={css.content}>
                <div className={css.leftBar}>
                    <Link href="/" className={css.leftTitle}>
                        Wooden Games
                    </Link>
                    <span className={css.leftText}>
                        We will bring and install our precious wood games at
                        your event!
                    </span>
                </div>
                <div className={css.linksBar}>
                    <div className={css.linksItem}>
                        <p className={css.linksTitle}>Conacts</p>
                        <Link href="/" className={css.linksText}>
                            woodengames@gmail.com
                        </Link>
                        <Link href="/" className={css.linksText}>
                            +995 (325) 432-432
                        </Link>
                        <p className={css.linksText}>English</p>
                    </div>
                    <div className={css.linksItem}>
                        <p className={css.linksTitle}>Wooden Games</p>
                        <Link href="/" className={css.linksText}>
                            Products
                        </Link>
                        <Link href="/" className={css.linksText}>
                            About Us
                        </Link>
                        <Link href="/" className={css.linksText}>
                            Find Us
                        </Link>
                    </div>
                    <div className={css.linksItem}>
                        <p className={css.linksTitle}>Information</p>
                        <Link href="/" className={css.linksText}>
                            FAQ — Rent and Return
                        </Link>
                        <Link href="/" className={css.linksText}>
                            Users Review
                        </Link>
                        <Link href="/" className={css.linksText}>
                            Privacy Policy
                        </Link>
                        <Link href="/" className={css.linksText}>
                            Cookies Settings
                        </Link>
                    </div>
                    <div className={css.linksItem}>
                        <p className={css.linksTitle}>Social</p>
                        <Link href="/" className={css.linksText}>
                            Instagram
                        </Link>
                        <Link href="/" className={css.linksText}>
                            Facebook
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <span className={css.copyrightText}>
                    Copyright © 2023 Craft Games. All rights reserved. <br />
                    Information about the cost of games and game sets for rent
                    is not a public offer and does not include self-employment
                    tax.Images of games in photos may differ from the originals.
                </span>
            </div>
        </footer>
    );
};
