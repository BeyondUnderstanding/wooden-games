import { cookies } from 'next/headers';
import { restService } from '../../service/global-action.service';
import { Product } from '../../ui-kit/side-popup/basket-popup.component';
import { GameContainer } from './game.container';

const getProps = async (id: number) => {
    ('use server');
    const cookieStore = cookies();
    let uuid = cookieStore.get('x-uuid');

    const service = restService();

    const productsResponce: Array<Product> = await service.getItems(
        uuid?.value
    );
    const basketResponce: Array<Product> = await service.getBasket(uuid?.value);
    const occupiedDates = await service.getOccupiedDates();
    const gameData = await service.getGameById(id, uuid?.value);
    const featured = await service.getFeatured(uuid?.value);
    return {
        productsResponce,
        basketResponce,
        occupiedDates,
        gameData,
        featured,
    };
};

export default async function Game({ params }: { params: { id: string } }) {
    const {
        productsResponce,
        basketResponce,
        occupiedDates,
        gameData,
        featured,
    } = await getProps(Number(params.id));
    return (
        <GameContainer
            basketProducts={basketResponce}
            products={productsResponce}
            occupiedDates={occupiedDates.data}
            productData={{
                ...gameData,
                header: gameData.title,
                characteristics: gameData.attributes,
                coast: gameData.price,
                disabled: !gameData.is_available,
                description: gameData.description,
                src: gameData.images.filter((img) => img.priority === 0)[0]
                    .link,
            }}
            imgs={gameData.images
                .filter((img) => img.priority !== 0)
                .map((el) => el.link)}
            fratured={featured}
        />
    );
}
