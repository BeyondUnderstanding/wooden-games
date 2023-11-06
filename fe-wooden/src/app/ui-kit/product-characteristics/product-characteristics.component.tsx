import css from './product-characteristics.module.css';
import cn from 'classnames';

export interface Characteristic {
    readonly label: string;
    readonly value: string;
}

export interface ProductCharacteristicsProps {
    readonly characteristics: Array<Characteristic>;
    readonly theme?: Array<string>;
}

export const ProductCharacteristics = ({
    characteristics,
    theme = [],
}: ProductCharacteristicsProps) => {
    return (
        <div className={cn(css.wrap, ...theme)}>
            {characteristics.map((c, i) => (
                <div key={c.label + i + c.value} className={css.line}>
                    <span>{c.label}</span>
                    <span>{c.value}</span>
                </div>
            ))}
        </div>
    );
};
