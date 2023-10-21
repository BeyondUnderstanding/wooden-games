import css from './product-characteristics.module.css';

export interface Characteristic {
    label: string;
    value: string;
}

export interface ProductCharacteristicsProps {
    readonly characteristics: Array<Characteristic>;
}

export const ProductCharacteristics = ({
    characteristics,
}: ProductCharacteristicsProps) => {
    return (
        <div className={css.wrap}>
            {characteristics.map((c, i) => (
                <div key={c.label + i + c.value} className={css.line}>
                    <span>{c.label}</span>
                    <span>{c.value}</span>
                </div>
            ))}
        </div>
    );
};
