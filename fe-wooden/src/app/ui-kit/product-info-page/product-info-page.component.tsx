import { constVoid } from 'fp-ts/lib/function';
import { CheckRuls } from '../check-ruls/check-ruls.component';
import {
    Characteristic,
    ProductCharacteristics,
} from '../product-characteristics/product-characteristics.component';
import { PlayersIcon } from '../icons/players-icon.component';
import { WeightIcon } from '../icons/weight-icon.component';
import css from './product-info-page.module.css';
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';
import { ChosenDate } from '../layout/layout.component';
import { Property } from '@frp-ts/core';

interface SmallLabelProps {
    readonly children: JSX.Element;
    readonly label: string;
}
const SmallLabel = ({ children, label }: SmallLabelProps) => {
    return (
        <div className={css.smallLabel}>
            {children}
            <span>{label}</span>
        </div>
    );
};

export interface ProductInfoPageProps {
    readonly characteristics: Array<Characteristic>;
    readonly chosenDate: Property<ChosenDate>;
    readonly setChosenDate: (x: ChosenDate) => void;
    readonly header: string;
}

export const ProductInfoPage = ({
    chosenDate,
    setChosenDate,
    characteristics,
    header,
}: ProductInfoPageProps) => {
    return (
        <div className={css.wrap}>
            <h1 className={css.headeLabel}>{header}</h1>
            <div className={css.labelsWrap}>
                <SmallLabel label="Players: 2-4">
                    <PlayersIcon />
                </SmallLabel>
                <SmallLabel label="Weight: 56 - 70kg">
                    <WeightIcon />
                </SmallLabel>
            </div>
            <div className={css.textWrap}>
                <p>
                    Many people are familiar with this game, but at this size
                    it&rsquo;s a very different experience. Players need to be
                    extremely careful not to get hit by a weighty brick from a
                    falling tower. Be especially careful if there are children
                    or people with disabilities in the immediate vicinity.
                </p>
                <p>
                    The aim of the game is to pull a brick from anywhere except
                    the first two rows from the top and place it on top of the
                    tower. When pulling it out, the neighbouring bricks must not
                    be touched. As the tower grows, it becomes less stable, the
                    player who collapses the tower loses.
                </p>
            </div>

            <div>
                <CalendarInputContainer
                    chosenDate={chosenDate}
                    setChosenDate={setChosenDate}
                    isBasket={true}
                    label="Enter the date"
                    unsetLabel="Lease date not specified"
                />
            </div>
            <CheckRuls
                goToCheckRulse={constVoid}
                theme={[css.checkRulsTheme]}
            />
            <ProductCharacteristics
                characteristics={characteristics}
                theme={[css.productCharacteristicsTheme]}
            />
        </div>
    );
};
