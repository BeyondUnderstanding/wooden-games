'use client';

import DropDown from '../faq-drop-down/drop-down.component';
import css from './faq.module.css';

const Faq = () => {
    return (
        <div className={css.wrap}>
            <h1 className={css.title}>FAQ</h1>
            <div className={css.listWrap}>
                <div className={css.list}>
                    <h2 className={css.title}>Shiping</h2>
                    <div className={css.questionsWrap}>
                        <DropDown question={'When do you roast and ship?'}>
                            <>
                                <p>
                                    An order placed through the Red Rooster
                                    website gets roasted and shipped to-order,
                                    typically on the following business day.
                                    Orders shipped via USPS will leave our
                                    premises first thing the following morning.
                                </p>
                                <p>
                                    For example, if you place your order at 9am
                                    EST on Friday, your order will roast on
                                    Monday and ship on Tuesday morning. If you
                                    place your order Monday morning at 9am, it
                                    will roast on Tuesday and ship on Wednesday.
                                </p>
                                <p>
                                    Weekends, sales and holidays will often
                                    delay shipments by a day or more.
                                </p>
                            </>
                        </DropDown>
                        <DropDown
                            question={
                                'Why did I get a shipment notification, but USPS says the order is still at the facility?'
                            }
                        >
                            <>
                                <p>
                                    An order placed through the Red Rooster
                                    website gets roasted and shipped to-order,
                                    typically on the following business day.
                                    Orders shipped via USPS will leave our
                                    premises first thing the following morning.
                                </p>
                            </>
                        </DropDown>
                        <DropDown
                            question={
                                'What do I do if my package does not arrive?'
                            }
                        >
                            <>
                                <p> Somsing else</p>
                            </>
                        </DropDown>
                    </div>
                </div>
                <div className={css.list}>
                    <h2 className={css.title}>Local Pickup</h2>
                    <div className={css.questionsWrap}>
                        <DropDown
                            question={
                                'I ordered online, when can I pickup my order?'
                            }
                        >
                            <>
                                <p>
                                    An order placed through the Red Rooster
                                    website gets roasted and shipped to-order,
                                    typically on the following business day.
                                    Orders shipped via USPS will leave our
                                    premises first thing the following morning.
                                </p>
                                <p>
                                    For example, if you place your order at 9am
                                    EST on Friday, your order will roast on
                                    Monday and ship on Tuesday morning. If you
                                    place your order Monday morning at 9am, it
                                    will roast on Tuesday and ship on Wednesday.
                                </p>
                                <p>
                                    Weekends, sales and holidays will often
                                    delay shipments by a day or more.
                                </p>
                            </>
                        </DropDown>
                        <DropDown
                            question={
                                'Why did I get a shipment notification, but USPS says the order is still at the facility?'
                            }
                        >
                            <>
                                <p>
                                    An order placed through the Red Rooster
                                    website gets roasted and shipped to-order,
                                    typically on the following business day.
                                    Orders shipped via USPS will leave our
                                    premises first thing the following morning.
                                </p>
                            </>
                        </DropDown>
                        <DropDown
                            question={
                                'What do I do if my package does not arrive?'
                            }
                        >
                            <>
                                <p> Somsing else</p>
                            </>
                        </DropDown>
                    </div>
                </div>
                <div className={css.list}>
                    <h2 className={css.title}>Shiping</h2>
                    <div className={css.questionsWrap}>
                        <DropDown
                            question={`What if I really don't like this coffee?`}
                        >
                            <>
                                <p>
                                    An order placed through the Red Rooster
                                    website gets roasted and shipped to-order,
                                    typically on the following business day.
                                    Orders shipped via USPS will leave our
                                    premises first thing the following morning.
                                </p>
                                <p>
                                    For example, if you place your order at 9am
                                    EST on Friday, your order will roast on
                                    Monday and ship on Tuesday morning. If you
                                    place your order Monday morning at 9am, it
                                    will roast on Tuesday and ship on Wednesday.
                                </p>
                                <p>
                                    Weekends, sales and holidays will often
                                    delay shipments by a day or more.
                                </p>
                            </>
                        </DropDown>
                        <DropDown
                            question={'What if I received the wrong product?'}
                            isWithoutBorder={true}
                        >
                            <>
                                <p>
                                    An order placed through the Red Rooster
                                    website gets roasted and shipped to-order,
                                    typically on the following business day.
                                    Orders shipped via USPS will leave our
                                    premises first thing the following morning.
                                </p>
                            </>
                        </DropDown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;