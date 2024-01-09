/* eslint-disable @next/next/no-img-element */
import { CheckRuls } from '../check-ruls/check-ruls.component';
import { ProductCharacteristics } from '../product-characteristics/product-characteristics.component';
import { PlayersIcon } from '../icons/players-icon.component';
import { WeightIcon } from '../icons/weight-icon.component';
import css from './product-info-page.module.css';
import { CalendarInputContainer } from '../calendar-input/calendar-input.container';
import { Button } from '../button/button.component';
import { Product } from '../side-popup/basket-popup.component';
import { ProductPageResp } from '../../service/global-action.service';
import { ProductGaleryMobile } from '../../ui-kit/product-galery/product-galery.component';
import { injectable } from '@injectable-ts/core';

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
    readonly imgs: Array<string>;
}

export const ProductInfoPage = injectable(
    CalendarInputContainer,
    (CalendarInputContainer) =>
        ({
            productData,
            add2Basket,
            goToCheckRulse,
            imgs,
        }: ProductInfoPageProps) => {
            const allCharacteristics = productData.characteristics.map(
                (el) => ({
                    ...el,
                    label: el.name,
                })
            );
            const characteristics = allCharacteristics.filter(
                (el) => !el.is_main
            );
            const players = allCharacteristics.filter(
                (el) => el.name === 'Players'
            )[0];
            const weight = allCharacteristics.filter(
                (el) => el.name === 'Weight'
            )[0];

            const add2Cart = () =>
                add2Basket({
                    ...productData,
                    name: productData.header,
                });

            return (
                <div className={css.wrapContent}>
                    <div className={css.galeryWrap}>
                        <ProductGaleryMobile
                            imgs={[productData.src, ...imgs]}
                        />
                    </div>
                    <div className={css.photoWrap}>
                        <img
                            src={productData.src}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className={css.photo}
                            alt="game photo"
                        />
                    </div>
                    <div className={css.wrap}>
                        <h1 className={css.headeLabel}>{productData.header}</h1>
                        <div className={css.labelsWrap}>
                            <SmallLabel
                                label={`${players?.label} ${players?.value}`}
                            >
                                <PlayersIcon />
                            </SmallLabel>
                            <SmallLabel
                                label={`${weight?.label} ${weight?.value}`}
                            >
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
                                    theme={{
                                        button: [css.calendarInputButtonTheme],
                                        wrap: [css.calendarInputwrapTeme],
                                    }}
                                />
                            </div>
                            <div className={css.block}>
                                <div className={css.priceWrap}>
                                    <span>Rental price:</span>
                                    <h3 className={css.price}>
                                        {productData.coast} ₾
                                    </h3>
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
        }
);
