import { Property } from '@frp-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { SelectInputsLabels } from '../calendar/calendar.container';
import { ButtonProps, ButtonType } from '../button/button.component';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '../../../utils/property.utils';
import { tap } from '@most/core';

interface CalendarInputViewModel {
    readonly chosenDate: Property<string>;
    readonly selectdDate: Property<Date>;
    readonly selectLabels: Property<{
        start: string;
        end: string;
    }>;
    readonly calendarIsShown: Property<boolean>;
    readonly buttonType: Property<ButtonType>;
    readonly isHeaderError: Property<boolean>;
    readonly setCalendarIsShown: (x: boolean) => void;
    readonly onSelectDate: (
        x: string,
        date: Date,
        labels: SelectInputsLabels
    ) => void;
}

interface NewCalendarViewModelProperty {
    readonly isBasket?: boolean;
    readonly finalDate?: (x: Date) => void;
}

type NewCalendarInputViewModel = (
    props: NewCalendarViewModelProperty
) => ValueWithEffect<CalendarInputViewModel>;

export const newCalendarInputViewModel: NewCalendarInputViewModel = ({
    isBasket,
    finalDate,
}) => {
    const chosenDate = newLensedAtom(
        isBasket ? 'Lease date not specified' : 'Any Date'
    );
    const selectdDate = newLensedAtom(new Date());
    const selectLabels = newLensedAtom({
        start: 'Start',
        end: 'End',
    });
    const calendarIsShown = newLensedAtom(false);

    const buttonType = newLensedAtom<ButtonType>('def');
    const isHeaderError = newLensedAtom(false);

    const onSelectDate = (
        x: string,
        date: Date,
        labels: SelectInputsLabels
    ) => {
        chosenDate.set(x);
        calendarIsShown.set(false);
        selectdDate.set(date);
        selectLabels.set(labels);
        finalDate && finalDate(date);
    };

    const setButtonTypeEffect = pipe(
        chosenDate,
        fromProperty,
        tap((chosenDate) => {
            const btnType = isBasket
                ? 'link'
                : chosenDate.includes(new Date().getFullYear().toString())
                ? 'prime'
                : 'def';
            buttonType.set(btnType);
            const err =
                (isBasket &&
                    !chosenDate.includes(
                        new Date().getFullYear().toString()
                    )) ??
                false;
            isHeaderError.set(err);
        })
    );

    return valueWithEffect.new(
        {
            chosenDate,
            selectdDate,
            selectLabels,
            calendarIsShown,
            onSelectDate,
            buttonType,
            isHeaderError,
            setCalendarIsShown: (x) => calendarIsShown.set(x),
        },
        setButtonTypeEffect
    );
};
