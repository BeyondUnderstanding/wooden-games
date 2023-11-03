'use client';
import React, { useState } from 'react';
import css from './drop-down.module.css';
import { DropDownIconOpen, DropDownIcon } from '../../icons/drop-down-icon.component';

const DropDown = () => {
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(!isOpen);

    return (
        <div className={css.wrap}>
            <h1 className={css.title}>Shiping</h1>
            <div className={css.questions}>

                <div className={css.dropDown}>
                    <div className={css.text}>
                        <h1 className={css.title}>When do you roast and ship?</h1>
                        <p className={css.answer}>
                            An order placed through the Red Rooster website gets
                            roasted and shipped to-order, typically on the following
                            business day. Orders shipped via USPS will leave our
                            premises first thing the following morning.
                        </p>
                        <p className={css.answer}>
                            For example, if you place your order at 9am EST on
                            Friday, your order will roast on Monday and ship on
                            Tuesday morning. If you place your order Monday morning
                            at 9am, it will roast on Tuesday and ship on Wednesday.
                        </p>
                        <p className={css.answer}>
                            Weekends, sales and holidays will often delay shipments
                            by a day or more.
                        </p>
                    </div>
                    <DropDownIconOpen/>
                </div>

                <div className={css.dropDown}>
                    <div className={css.text}>
                        <h1 className={css.title}>Why did I get a shipment notification, but USPS says the order is still at the facility?</h1>
                    </div>
                    <DropDownIcon/>
                </div>
                <div className={css.dropDown}>
                    <div className={css.text}>
                        <h1 className={css.title}>What do I do if my package does not arrive?</h1>
                    </div>
                    <DropDownIcon/>
                </div>
                
            </div>
        </div>
    );
};

export default DropDown;
