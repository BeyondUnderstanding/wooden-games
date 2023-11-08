import { Stream } from '@most/types';
import { fromPromise } from '@most/core';
import axios, { AxiosResponse } from 'axios';
import { Product } from '../ui-kit/side-popup/basket-popup.component';
import { getCookie } from 'cookies-next';
import { FormData } from '../ui-kit/side-popup/check-out-popup.component';

interface AddBasketItemI {
    readonly id: number;
}

interface AddBasketItemReurnT {
    readonly message: string | null;
}

interface ItemsResponce {
    id: number;
    title: string;
    price: number;
    is_available: boolean;
    images: Array<{ link: string; priority: number }>;
}

const domain = 'http://master.wooden_backend.staginator.local/v1/client';
const API = {
    domain,
    basket: `${domain}/basket`,
    games: `${domain}/games`,
};

export interface RestService {
    readonly addBasketItem: (
        raw: AddBasketItemI
    ) => Promise<AxiosResponse<AddBasketItemReurnT>>;
    readonly getBasket: (uid: string | undefined) => Promise<Array<Product>>;
    readonly getItems: () => Promise<Array<Product>>;
    readonly updateDate: (data: {
        readonly start_date: string;
        readonly end_date: string;
    }) => Stream<number>;
    readonly delFromBasket: (id: number) => Promise<number>;
    readonly createOrder: (
        clientData: FormData
    ) => Stream<AxiosResponse<{ checkout_url: string }>>;
}

export type NewRestService = () => RestService;

export const restService: NewRestService = () => ({
    addBasketItem: (raw) =>
        axios.post(API.basket, raw, {
            headers: {
                'x-uuid': getCookie('x-uuid'),
            },
        }),
    delFromBasket: (id) => {
        const prom = axios
            .delete<Array<ItemsResponce>>(API.basket + `?id=${id}`, {
                headers: {
                    'x-uuid': getCookie('x-uuid'),
                },
            })
            .then((resp) => {
                return resp.status;
            })
            .catch(() => 500);
        return prom;
    },
    getBasket: (uid) => {
        const prom = axios
            .get<Array<ItemsResponce>>(API.basket, {
                headers: {
                    'x-uuid': uid,
                },
            })
            .then((resp) => {
                const data: Array<Product> = resp.data.map((data) => ({
                    src: data.images[0]?.link ?? '',
                    coast: data.price,
                    name: data.title,
                    disabled: !data.is_available,
                    id: data.id,
                }));
                return data;
            })
            .catch(() => []);
        return prom;
    },
    getItems: () => {
        const prom = axios.get<Array<ItemsResponce>>(API.games).then((resp) => {
            const data: Array<Product> = resp.data.map((data) => ({
                src: data.images[0]?.link ?? '',
                coast: data.price,
                name: data.title,
                disabled: !data.is_available,
                id: data.id,
            }));
            return data;
        });
        return prom;
    },
    updateDate: (data) => {
        const prom = axios
            .patch<Array<ItemsResponce>>(API.basket, data, {
                headers: {
                    'x-uuid': getCookie('x-uuid'),
                },
            })
            .then((resp) => {
                return resp.status;
            })
            .catch(() => 500);
        return fromPromise(prom);
    },
    createOrder: (userData) => {
        return fromPromise(
            axios.post(
                API.basket + '/create_order',
                {
                    client_name: userData.name.data,
                    client_phone: userData.phone.data,
                    client_email: userData.email.data,
                    legal_id: userData.passport.data,
                },
                {
                    headers: {
                        'x-uuid': getCookie('x-uuid'),
                    },
                }
            )
        );
    },
});
