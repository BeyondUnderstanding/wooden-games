import { Stream } from '@most/types';
import { fromPromise } from '@most/core';
import { Joke } from '../components/generator-joks/generator-joks.view-model';

export interface RestService {
    getNewJoke: () => Stream<Joke>;
}

export type NewRestService = () => RestService;

export const restService: NewRestService = () => ({
    getNewJoke: () =>
        fromPromise(
            fetch('https://official-joke-api.appspot.com/random_joke').then(
                (res) => res.json()
            )
        ),
});
