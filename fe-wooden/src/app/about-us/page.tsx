import { cookies } from 'next/headers';
import { useUUID } from '../../utils/cookie.utils';
import { restService } from '../service/global-action.service';
import { Product } from '../ui-kit/side-popup/basket-popup.component';
import { AboutUsPageContainer } from './about-us-page.container';

const getProps = async () => {
    ('use server');
    const cookieStore = cookies();
    let uuid = cookieStore.get('x-uuid');

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
    useUUID();
    const { productsResponce, basketResponce, occupiedDates } =
        await getProps();
    return (
        <AboutUsPageContainer
            basketProducts={basketResponce}
            products={productsResponce}
            occupiedDates={occupiedDates.data}
        />
    );
}
