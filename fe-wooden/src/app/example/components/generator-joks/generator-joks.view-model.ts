import { RestService } from '../../service/rest-service';
import { pipe } from 'fp-ts/lib/function';
import { newLensedAtom } from '@frp-ts/lens';
import { chain, tap } from '@most/core';
import { Property } from '@frp-ts/core';
import { fromProperty } from '../../../../utils/property.utils';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../../utils/run-view-model.utils';
import { observe } from 'most';

export interface GeneratorJoksViewModel {
    triger: () => void;
    jokes: Property<FormatedJokes[]>;
}

export interface FormatedJokes {
    id: number;
    joke: string;
}

export interface Joke {
    id: number;
    punchline: string;
    setup: string;
    type: string;
}

type NewGeneratorJoksViewModel = (
    service: RestService
) => ValueWithEffect<GeneratorJoksViewModel>;

export const newGeneratorJoksViewModel: NewGeneratorJoksViewModel = (
    service
) => {
    const triger = newLensedAtom(1);
    const jokes = newLensedAtom<Array<FormatedJokes>>([]);

    const fotmatJoke = (j: Joke) => ({
        id: j.id,
        joke: `${j.setup} ${j.punchline}`,
    });
    const t = pipe(
        triger,
        fromProperty,
        chain(service.getNewJoke),
        tap(console.log),
        tap((x) => jokes.modify((jokes) => [...jokes, fotmatJoke(x)]))
    );

    return valueWithEffect.new(
        {
            triger: () => {
                triger.modify((x) => x + 1);
            },
            jokes: jokes,
        },
        t
    );
};
