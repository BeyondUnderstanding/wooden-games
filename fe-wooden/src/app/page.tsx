import { restService } from './service/global-action.service';
import { Product } from './ui-kit/side-popup/basket-popup.component';
import { PageContainer } from './page.container';

const getProps = async () => {
    const service = restService();
    const productsResponce: Array<Product> = await service.getItems();

    return {
        productsResponce,
    };
};

export default async function Home() {
    const { productsResponce } = await getProps();

    return (
        <PageContainer
            // basketProducts={basketResponce}
            products={productsResponce}
        />
    );
}
