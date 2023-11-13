import { restService } from './service/global-action.service';
import { Product } from './ui-kit/side-popup/basket-popup.component';
import { PageContainer } from './page.container';
import { cookies } from 'next/headers';

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

export default async function Home() {
    const { productsResponce, basketResponce, occupiedDates } =
        await getProps();
    return (
        <PageContainer
            basketProducts={basketResponce}
            products={productsResponce}
            occupiedDates={occupiedDates.data}
        />
    );
}
