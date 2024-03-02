import { cookies } from 'next/headers';
import { PaymentStatusesSuccessPageContainer } from './payment-statuses-succes.container';
import { restService } from '../../service/global-action.service';
import { Product } from '../../ui-kit/side-popup/basket-popup.component';

const getProps = async () => {
    ('use server');
    const cookieStore = cookies();
    const uuid = cookieStore.get('x-uuid');

    const service = restService();

    const productsResponce: Array<Product> = await service.getItems(
        uuid?.value
    );
    const basketResponce: Array<Product> = await service.getBasket(uuid?.value);
    const occupiedDates = await service.getOccupiedDates();

    return {
        productsResponce,
        basketResponce,
        occupiedDates,
    };
};

export default async function PaymentStatusesSuccessPage() {
    const { productsResponce, basketResponce, occupiedDates } =
        await getProps();
    return (
        <PaymentStatusesSuccessPageContainer
            basketProducts={basketResponce}
            products={productsResponce}
            occupiedDates={occupiedDates.data}
        />
    );
}
