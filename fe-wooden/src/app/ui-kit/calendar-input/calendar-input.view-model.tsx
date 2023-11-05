import { Property } from '@frp-ts/core';
import {
    ValueWithEffect,
    valueWithEffect,
} from '../../../utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { SelectInputsLabels } from '../calendar/calendar.container';
import { ButtonType } from '../button/button.component';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '../../../utils/property.utils';
import { chain, multicast, skip, tap } from '@most/core';
import { ChosenDate } from '../layout/layout.component';
import { InputType } from '../select-input/select-input.component';
import { restService } from '../../service/global-action.service';

interface CalendarInputViewModel {
    readonly chosenDate: Property<ChosenDate>;
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
    readonly chosenDate: Property<ChosenDate>;
    readonly setChosenDate: (x: ChosenDate) => void;
}

type NewCalendarInputViewModel = (
    props: NewCalendarViewModelProperty
) => ValueWithEffect<CalendarInputViewModel>;

export const newCalendarInputViewModel: NewCalendarInputViewModel = ({
    isBasket,
    chosenDate,
    setChosenDate,
}) => {
    const selectLabels = newLensedAtom({
        start: 'Start',
        end: 'End',
    });
    const calendarIsShown = newLensedAtom(false);

    const buttonType = newLensedAtom<ButtonType>('def');
    const isHeaderError = newLensedAtom(false);

    const dtae2ChosenDate = (date: Date, label: InputType): Date => {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            label.value
        );
    };

    const onSelectDate = (
        x: string,
        date: Date,
        labels: SelectInputsLabels
    ) => {
        setChosenDate({
            start: dtae2ChosenDate(date, labels.start),
            end: dtae2ChosenDate(date, labels.end),
            label: x,
        });
        calendarIsShown.set(false);
        selectLabels.set({ start: labels.start.label, end: labels.end.label });
    };

    const setButtonTypeEffect = pipe(
        chosenDate,
        fromProperty,
        tap((chosenDate) => {
            const btnType = isBasket
                ? 'link'
                : chosenDate.label?.includes(
                      new Date().getFullYear().toString()
                  )
                ? 'prime'
                : 'def';
            buttonType.set(btnType);
            const err =
                (isBasket &&
                    !chosenDate.label?.includes(
                        new Date().getFullYear().toString()
                    )) ??
                false;
            isHeaderError.set(err);
        }),
        multicast
    );

    const updateDateEffect = pipe(
        chosenDate,
        fromProperty,
        skip(1),
        chain((date) =>
            restService().updateDate({
                start_date: date.start.toISOString(),
                end_date: date.end.toISOString(),
            })
        )
    );

    return valueWithEffect.new(
        {
            chosenDate,
            selectLabels,
            calendarIsShown,
            onSelectDate,
            buttonType,
            isHeaderError,
            setCalendarIsShown: (x) => calendarIsShown.set(x),
        },
        setButtonTypeEffect,
        updateDateEffect
    );
};
