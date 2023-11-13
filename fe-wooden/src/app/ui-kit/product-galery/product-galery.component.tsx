import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// import required modules
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export interface ProductGaleryProps {
    readonly imgs: Array<string>;
}

export const ProductGalery = ({ imgs }: ProductGaleryProps) => {
    return (
        <Swiper spaceBetween={24} slidesPerView={2} modules={[Autoplay]}>
            {imgs.map((src) => (
                <SwiperSlide key={src}>
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
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
