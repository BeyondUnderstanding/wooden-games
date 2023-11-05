import { restService } from './service/global-action.service';
import { Product } from './ui-kit/side-popup/basket-popup.component';
import { PageContainer } from './page.container';
import { cookies } from 'next/headers';
const getProps = async () => {
    const cookieStore = cookies();
    const uuid = cookieStore.get('x-uuid');

    const service = restService();
    const productsResponce: Array<Product> = await service.getItems();
    const basketResponce: Array<Product> = await service.getBasket2(
        uuid?.value
    );

    return {
        productsResponce,
        basketResponce,
    };
};

export default async function Home() {
    const { productsResponce, basketResponce } = await getProps();
    console.log('basketResponce', basketResponce);
    return (
        <PageContainer
            basketProducts={basketResponce}
            products={productsResponce}
        />
    );
}
