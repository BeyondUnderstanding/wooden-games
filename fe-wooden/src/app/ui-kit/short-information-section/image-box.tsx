import Image, { StaticImageData } from 'next/image';
import css from './short-information-section.module.css';
import abacus from '../../../../public/img/short-information-section/abakus.jpg';
import balls from '../../../../public/img/short-information-section/chainBalls.jpg';
import jenga from '../../../../public/img/short-information-section/jengaAndKids.jpg';
import ticTacToe from '../../../../public/img/short-information-section/ticTacToe.jpg';

const photos: Array<StaticImageData> = [abacus, balls, jenga, ticTacToe];

export const ImageBox = () => {
    return (
        <div className={css.images}>
            {photos.map((src) => (
                <Image
                    src={src}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={css.photo}
                    alt="game picture"
                    key={src.src}
                    style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '832px',
                    }}
                />
            ))}
        </div>
    );
};
