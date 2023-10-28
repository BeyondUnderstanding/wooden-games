'use client';

import css from './main-section.module.css';

export const MainSection = () => {
    return (
        <div className={css.wrap}>
            <div className={css.info}>
                <span className={css.title}>
                    Crafted Wooden <br />
                    Games from England
                </span>
                <span className={css.text}>
                    Many people are familiar with this game,but at this size
                    it's a very different experience.
                </span>
            </div>

            <div className={css.lower}>
                <div className={css.element}>Games for Team Building</div>
                <div className={css.element}>Play Area for the Party </div>
                <div className={css.element}>
                    Welcome Area for the Wedding
                </div>
            </div>
        </div>
    );
};
