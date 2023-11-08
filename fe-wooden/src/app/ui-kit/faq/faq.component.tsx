'use client';
import React, { useState } from 'react';
import css from './drop-down.module.css';

const Faq = () => {
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(!isOpen);

    return (
        <div className={css.wrap}>
            <h1 className={css.title}>Shiping</h1>
            
            <div className={css.questions}>

            
                
            </div>
        </div>
    );
};

export default Faq;
