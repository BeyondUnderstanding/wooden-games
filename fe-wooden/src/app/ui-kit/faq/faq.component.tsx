'use client';

import DropDown from '../faq-drop-down/drop-down.component';
import css from './faq.module.css';

const Faq = () => {
    return (
        <div className={css.wrap}>
            <h1 className={css.title}>FAQ</h1>
            <div className={css.listWrap}>
                <div className={css.list}>
                    <h2 className={css.title}>Booking</h2>
                    <div className={css.questionsWrap}>
                        <DropDown question={'How can I book games?'}>
                            <p>
                                Select the date of your event. The list below
                                will show the games available for your date. Add
                                your favorite games to the cart. Place your
                                order by following the instructions and pay 50%
                                prepayment
                            </p>
                        </DropDown>
                        <DropDown question={'How can I cancel my booking'}>
                            <p>
                                You have the option to cancel your booking and
                                refund your prepayment 3 days before your event.
                                Write to us by e-mail with the order number you
                                received in the e-mail with the subject
                                &quot;Cancel booking&quot;. The request is
                                processed within 24 hours. Refund terms and
                                conditions see &quot;Refund terms and
                                conditions&quot; section
                            </p>
                        </DropDown>
                    </div>
                </div>
                <div className={css.list}>
                    <h2 className={css.title}>Delivery</h2>
                    <div className={css.questionsWrap}>
                        <DropDown question={'How is the delivery made'}>
                            <p>
                                Delivery is possible only in Tbilisi. Delivery
                                is made by &quot;Yandex.Delivery&quot; service
                                if your order does not include manager service
                                and is paid additionally. The cost of delivery
                                is 15 GEL. If your order is accompanied by a
                                manager service, the delivery is carried out by
                                our manager.
                            </p>
                        </DropDown>
                        <DropDown question={'How should I return games?'}>
                            <>
                                <p>
                                    If you made a delivery using
                                    &quot;Yandex.Delivery&quot; service, you can
                                    send the games yourself by the same way. We
                                    will inform you the address additionally. Or
                                    you can bring them to the address yourself.
                                    Attention! In case of returning games via
                                    delivery service we will call you by video
                                    call to confirm the integrity of the games.
                                </p>
                            </>
                        </DropDown>
                    </div>
                </div>
                <div className={css.list}>
                    <h2 className={css.title}>Others</h2>
                    <div className={css.questionsWrap}>
                        <DropDown
                            question={`What guarantees that I will have the games I want?`}
                        >
                            <p>
                                By booking the games you automatically reserve
                                the games for yourself and you will get what you
                                ordered. The only time we will need to change a
                                booking is if previous users have caused damage.
                                Therefore, we ask all our customers to return
                                the inventory in the condition they received it.
                            </p>
                        </DropDown>
                        <DropDown
                            question={`Are there any days when games cannot be ordered?`}
                        >
                            <p>
                                We are available 7 days a week, including
                                holidays. If a day is unavailable, the games are
                                already booked.
                            </p>
                        </DropDown>
                        <DropDown
                            question={`Is there a maximum number of games that can be rented?`}
                        >
                            <p>
                                The maximum number of games that can be booked
                                is 10
                            </p>
                        </DropDown>
                        <DropDown
                            question={`Is there a minimum number of rented games?`}
                        >
                            <p>
                                The minimum number of games that can be booked
                                is 3
                            </p>
                        </DropDown>
                        <DropDown question={`Do you have discounts?`}>
                            <p>
                                Of course! After all, a rest should be in
                                pleasure! Ordering 5 games for 3 hours or 3
                                games for 5 hours, you get a 15% discount. + We
                                additionally provide a manager who will take
                                care that all your guests familiarize themselves
                                with the rules and get maximum pleasure from the
                                game! Ordering 9 games for 5 hours you get a 30%
                                discount, plus we additionally provide a 3D Tic
                                Tac Toe game, as well as invite two managers to
                                your event, who will make sure that all your
                                guests familiarize themselves with the rules and
                                get the maximum pleasure from the game!
                            </p>
                        </DropDown>
                        <DropDown question={`Why am I providing an ID?`}>
                            <p>
                                There are 2 reasons why we ask for your details.
                                We work officially and your details are required
                                for invoicing purposes. By providing your data
                                you agree that you are responsible for the
                                safety of the games. In case of damaged
                                inventory, you will be compensated for repair
                                costs and downtime if the same game is booked
                                for the next day.
                            </p>
                        </DropDown>
                        <DropDown
                            question={'What happens if the game is damaged?'}
                            isWithoutBorder={true}
                        >
                            <p>
                                In case of damaged inventory, you will be
                                reimbursed for repair costs and downtime if the
                                same game is booked for the next three days.
                            </p>
                        </DropDown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
