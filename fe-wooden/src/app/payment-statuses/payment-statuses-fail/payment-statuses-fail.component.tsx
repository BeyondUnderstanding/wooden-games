import css from '../payment-statuses.module.css';

export const PaymentStatusesFail = () => (
    <div className={css.wrap}>
        <span>Something went wrong and the payment was not honored.</span>
    </div>
);
