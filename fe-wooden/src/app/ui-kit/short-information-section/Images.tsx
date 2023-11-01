import Image from 'next/image';
import photos from './structuring-images';
import css from './short-information-section.module.css';

export const Images = () => {
    return (
        <div className={css.images}>
            {photos.map((src) => (
                <Image
                    src={src}
                    width={732}
                    height={520}
                    className={css.photo}
                    alt="game picture"
                />
            ))}
        </div>
    );
};
