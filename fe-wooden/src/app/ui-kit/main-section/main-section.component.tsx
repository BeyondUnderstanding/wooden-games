'use client';

import css from './main-section.module.css';

export const MainSection = () => {
    return (
        <div className={css.wrap}>
            <div className={css.info}>
                <span className={css.title}>
                    Crafted Wooden <br />
                    Games
                </span>
                <span className={css.text}>
                    Many people are familiar with this game, but at this size
                    it`&apos;s a very different experience.
                </span>
            </div>

            <div className={css.footnotes}>
                <div className={css.element}>Games for Team Building</div>
                <div className={css.element}>Play Area for the Party </div>
                <div className={css.element}>Welcome Area for the Wedding</div>
                <div className={css.element}>
                    Coffee break Zone for the Conference
                </div>
            </div>
        </div>
    );
};
