import { CheckRuls } from '../check-ruls/check-ruls.component';
import { ProductCharacteristics } from '../product-characteristics/product-characteristics.component';
import { PlayersIcon } from '../icons/players-icon.component';
import { WeightIcon } from '../icons/weight-icon.component';
import css from './product-info-page.module.css';
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';
import { ChosenDate } from '../layout/layout.component';
import { Property } from '@frp-ts/core';
import { Button } from '../button/button.component';
import { Stream } from '@most/types';
import { Product } from '../side-popup/basket-popup.component';
import { ProductPageResp } from '../../service/global-action.service';
import { ProductGalery,ProductGaleryProps } from '../product-galery/product-galery.component';

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
    readonly chosenDate: Property<ChosenDate>;
    readonly setChosenDate: (x: ChosenDate) => void;
    readonly updateDate: (date: ChosenDate) => Stream<unknown>;
    readonly occupiedDates: Array<Date>;
    readonly productData: {
        readonly id: number;
        readonly header: string;
        readonly characteristics: ProductPageResp['attributes'];
        readonly coast: number;
        readonly disabled: boolean;
        readonly description: string | JSX.Element;
        readonly src: string;
    };
    readonly add2Basket: (x: Product) => void;
    readonly goToCheckRulse: () => void;
}

export const ProductInfoPage = ({
    chosenDate,
    setChosenDate,
    productData,
    updateDate,
    occupiedDates,
    add2Basket,
    goToCheckRulse,
}: ProductInfoPageProps) => {
    const allCharacteristics = productData.characteristics.map((el) => ({
        ...el,
        label: el.name,
    }));
    const characteristics = allCharacteristics.filter((el) => !el.is_main);
    const players = allCharacteristics.filter((el) => el.name === 'Players')[0];
    const weight = allCharacteristics.filter((el) => el.name === 'Weight')[0];

    const add2Cart = () =>
        add2Basket({
            ...productData,
            name: productData.header,
        });
    return (
        <div className={css.wrapContent}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={productData.src}
                width={0}
                height={0}
                sizes="100vw"
                className={css.photo}
                alt="game photo"
            />
            <div className={css.wrap}>
                <h1 className={css.headeLabel}>{productData.header}</h1>
                <div className={css.labelsWrap}>
                    <SmallLabel label={`${players?.label} ${players?.value}`}>
                        <PlayersIcon />
                    </SmallLabel>
                    <SmallLabel label={`${weight?.label} ${weight?.value}`}>
                        <WeightIcon />
                    </SmallLabel>
                </div>
                <div
                    className={css.textWrap}
                    dangerouslySetInnerHTML={{
                        __html: productData.description,
                    }}
                ></div>

                <div className={css.controlsWrap}>
                    <div className={css.block}>
                        <span>Your Date:</span>
                        <CalendarInputContainer
                            chosenDate={chosenDate}
                            setChosenDate={setChosenDate}
                            isBasket={true}
                            label="Enter the date"
                            unsetLabel="Lease date not specified"
                            theme={{
                                button: [css.calendarInputButtonTheme],
                                wrap: [css.calendarInputwrapTeme],
                            }}
                            updateDate={updateDate}
                            occupiedDates={occupiedDates}
                        />
                    </div>
                    <div className={css.block}>
                        <div className={css.priceWrap}>
                            <span>Rental price:</span>
                            <h3 className={css.price}>{productData.coast} ₾</h3>
                        </div>
                        <Button
                            label={'Add to Cart'}
                            onClick={add2Cart}
                            disabled={productData.disabled}
                            type={'def'}
                            size="medium"
                        />
                    </div>
                </div>
                <CheckRuls
                    goToCheckRulse={goToCheckRulse}
                    theme={[css.checkRulsTheme]}
                />
                <ProductCharacteristics
                    characteristics={characteristics}
                    theme={[css.productCharacteristicsTheme]}
                />
            </div>
        </div>
    );
};
