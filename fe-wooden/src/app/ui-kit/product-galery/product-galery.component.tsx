import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import css from './product-galery.module.css';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
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
                            <Image
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
            style={{
                '--swiper-navigation-color': '#000',
                '--swiper-pagination-color': '#000',
            }}
            w
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
        >
            {imgs.map((src) => (
                <SwiperSlide key={src}>
                    <div className={css.wrapMobile}>
                        <Image
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
