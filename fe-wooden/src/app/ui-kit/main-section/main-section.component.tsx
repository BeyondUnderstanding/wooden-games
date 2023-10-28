'use client';

import css from './main-section.module.css';

export const MainSection = () => {
    return (
        <div className={css.wrap}>
            <div className={css.infoBar}>
                <span className={css.infoTitle}>
                    Crafted Wooden <br />
                    Games from England
                </span>
                <span className={css.infoText}>
                    Many people are familiar with this game,but at this size
                    it's a very different experience.
                </span>
            </div>

            <div className={css.linksBar}>
                <div className={css.linksElement}>Games for Team Building</div>
                <div className={css.linksElement}>Play Area for the Party </div>
                <div className={css.linksElement}>
                    Welcome Area for the Wedding
                </div>
            </div>
        </div>
    );
};
