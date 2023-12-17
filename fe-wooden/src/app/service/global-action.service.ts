import { Stream } from '@most/types';
import { fromPromise } from '@most/core';
import axios, { AxiosResponse } from 'axios';
import { Product } from '../ui-kit/side-popup/basket-popup.component';
import { getCookie, setCookie } from 'cookies-next';
import { FormData } from '../ui-kit/side-popup/check-out-popup.component';
import { ChosenDate } from '../ui-kit/layout/layout.component';
import { v4 as uuidv4 } from 'uuid';

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

export interface ProductPageResp {
    id: number;
    title: string;
    price: number;
    is_available: boolean;
    images: Array<{
        link: string;
        priority: number;
    }>;
    attributes: Array<{
        name: string;
        value: string;
        is_main: boolean;
    }>;
    description: string;
}

const domain = process.env.DOMAIN_URL;
console.log(process.env.DOMAIN_URL, 'process.env.DOMAIN_URL');

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
    readonly getItems: (uid: string | undefined) => Promise<Array<Product>>;
    readonly getItemsByDate: (
        date: ChosenDate
    ) => Stream<{ products: Array<Product> }>;
    readonly updateDate: (data: {
        readonly start_date: string;
        readonly end_date: string;
    }) => Stream<number>;
    readonly delFromBasket: (id: number) => Promise<number>;
    readonly createOrder: (
        clientData: FormData,
        typePayment: 'card' | 'prepayment'
    ) => Stream<AxiosResponse<{ checkout_url: string }>>;
    readonly getOccupiedDates: () => Promise<AxiosResponse<Array<Date>>>;
    readonly getGameById: (
        id: number,
        uid: string | undefined
    ) => Promise<ProductPageResp>;
    readonly getFeatured: (uid: string | undefined) => Promise<Array<Product>>;
}

const getServiceUid = (uid: string | undefined) => {
    let uuid;
    if (!uid) {
        uuid = uuidv4();
        setCookie('x-uuid', uuid);
    } else {
        uuid = uid;
    }
    return uuid;
};

const be2FeItem = (data: ItemsResponce) => ({
    src: data.images[0]?.link ?? '',
    coast: data.price,
    name: data.title,
    disabled: !data.is_available,
    id: data.id,
});

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
    getItems: (uid) => {
        const uuid = getServiceUid(uid);
        const prom = axios
            .get<Array<ItemsResponce>>(API.games, {
                headers: {
                    'x-uuid': uuid,
                },
            })
            .then((resp) => resp.data.map(be2FeItem));
        return prom;
    },
    getItemsByDate: (date) => {
        return fromPromise(
            axios
                .get<Array<ItemsResponce>>(
                    API.games +
                        `/by_date?start_date=${date.start.toISOString()}&end_date=${date.end.toISOString()}`,
                    {
                        headers: {
                            'x-uuid': getCookie('x-uuid'),
                        },
                    }
                )
                .then((resp) => ({
                    products: resp.data.map(be2FeItem),
                }))
        );
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
    createOrder: (userData, payment_method) => {
        return fromPromise(
            axios.post(
                API.basket + '/create_order',
                {
                    client_name: userData.name.data,
                    client_phone: userData.phone.data,
                    client_email: userData.email.data,
                    legal_id: userData.passport.data,
                    delivery_address: userData.deliveryAddress.data,
                    extra: userData.comment.data,
                    payment_method,
                },
                {
                    headers: {
                        'x-uuid': getCookie('x-uuid'),
                    },
                }
            )
        );
    },
    getOccupiedDates: () => {
        return axios.get(API.games + '/get_occupied_dates').then((resp) => ({
            ...resp,
            data: resp.data.map((x: string) => new Date(x)),
        }));
    },
    getGameById: (id, uid) => {
        const uuid = getServiceUid(uid);

        return axios
            .get(API.games + `/get?id=${id}`, {
                headers: {
                    'x-uuid': uuid,
                },
            })
            .then((resp) => resp.data);
    },
    getFeatured: (uid) => {
        const uuid = getServiceUid(uid);
        const prom = axios
            .get<Array<ItemsResponce>>(API.games + '/featured', {
                headers: {
                    'x-uuid': uuid,
                },
            })
            .then((resp) => resp.data.map(be2FeItem));
        return prom;
    },
});
