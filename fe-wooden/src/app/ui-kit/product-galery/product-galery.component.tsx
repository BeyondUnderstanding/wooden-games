/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import css from './product-galery.module.css';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';

export interface ProductGaleryProps {
    readonly imgs: Array<string>;
}

export const ProductGalery = ({ imgs }: ProductGaleryProps) => {
    return (
        <div className={css.productGaleryWrap}>
            <Swiper spaceBetween={24} slidesPerView={2} modules={[Autoplay]}>
                {imgs.map((src) => (
                    <SwiperSlide key={src}>
                        <div className={css.swiperWrapMobile}>
                            <img
                                src={src}
                                alt="game photo"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '820px',
                                    borderRadius: '32px',
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export const ProductGaleryMobile = ({ imgs }: ProductGaleryProps) => {
    return (
        <Swiper
            centeredSlides={true}
            autoplay={{
                delay: 2500,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
        >
            {imgs.map((src) => (
                <SwiperSlide key={src}>
                    <div className={css.wrapMobile}>
                        <img
                            src={src}
                            alt="game photo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxWidth: '252px',
                                borderRadius: '32px',
                            }}
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
