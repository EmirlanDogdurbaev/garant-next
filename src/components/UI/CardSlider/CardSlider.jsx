import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import {useEffect, useRef} from 'react';
import styles from './CardSlider.module.scss';
import React from 'react';
import ArrowButton from "../ArrowButton/ArrowButton.jsx";
import Link from "next/link";

const CardSlider = ({cards}) => {
    const swiperRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);


    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            const swiperInstance = swiperRef.current.swiper;
            swiperInstance.params.navigation.prevEl = prevButtonRef.current;
            swiperInstance.params.navigation.nextEl = nextButtonRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, []);


    return (
        <div className={styles.cardSlider}>
            <ArrowButton prevRef={prevButtonRef} nextRef={nextButtonRef}/>
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: {slidesPerView: 2},
                    768: {slidesPerView: 2},
                    800: {slidesPerView: 3},
                    1024: {slidesPerView: 3},
                    1280: {slidesPerView: 4},
                }}
            >
                {cards.map((card) => (
                    <SwiperSlide key={card.id} className={styles.card}>
                        <Link
                            href={`/catalog/${card.collection_id ? "product" : "collection"}/${card.id}`}
                            className={styles.Product}
                        >
                            {card.isProducer ? <span className={styles.brand}>Garant</span> : ""}
                            <div>
                                <img src={card.photos?.[0]?.url || ""} alt={card.name}/>
                                <aside>
                                    <h4>{card.name}</h4>
                                    <div className={styles.line}/>
                                    <p> {card.new_price !== 0 ? <>{card.new_price}</> :
                                        card.price !== 0 ? <>{card.price} сом</> :
                                            "Цена не указано"
                                    }</p>
                                </aside>
                            </div>
                        </Link>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CardSlider;
