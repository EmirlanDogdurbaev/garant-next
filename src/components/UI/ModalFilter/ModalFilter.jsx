import {useState, useEffect} from 'react';
import Slider from 'rc-slider';
import styles from './ModalFilter.module.scss';
import "rc-slider/assets/index.css";
import {useDispatch, useSelector} from "react-redux";
import {searchByPriceRange, setPriceRange} from "@/store/slices/filter/search";
import React from 'react';
function ModalFilter({ onClose }) {
    const [isClosing, setIsClosing] = useState(false);
    const [minValue, setMinValue] = useState(1);
    const [maxValue, setMaxValue] = useState(100000);
    const [productType, setProductType] = useState(true);
    const [isPainted, setIsPainted] = useState(true);

    const dispatch = useDispatch();
    const { min, max } = useSelector((state) => state.search.filters.priceRange);

    useEffect(() => {
        setMinValue(min);
        setMaxValue(max);
    }, [min, max]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsClosing(true);
            setTimeout(() => {
                onClose();
            }, 500);
        }
    };

    const handleSliderChange = (value) => {
        setMinValue(Math.max(1, value[0]));
        setMaxValue(value[1]);
    };

    const handleMinInputChange = (e) => {
        const value = Math.max(1, Number(e.target.value.replace(/\D/g, "")));
        setMinValue(value);
    };

    const handleMaxInputChange = (e) => {
        const value = Math.max(0, Number(e.target.value.replace(/\D/g, ""))); // Убираем все нецифровые символы
        setMaxValue(value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 500);

        const filters = {
            min: minValue,
            max: maxValue,
        };
        dispatch(setPriceRange({ min: minValue, max: maxValue }));
        dispatch(searchByPriceRange(filters));
    };

    const handleClear = () => {
        setMinValue(1);
        setMaxValue(100000);
        setProductType(true);
        setIsPainted(true);
    };

    const formatNumber = (number) => {
        return number.toLocaleString("ru-RU");
    };

    return (
        <div
            className={`${styles.overlay} ${isClosing ? styles.fadeOut : ""}`}
            onClick={handleOverlayClick}
        >
            <div className={`${styles.wrap} ${isClosing ? styles.fadeOutWrap : ""}`}>
                <form onSubmit={handleFormSubmit}>
                    <div className={styles.box}>
                        <div className={styles.range}>
                            <p>Цены</p>
                            <Slider
                                range
                                min={1}
                                max={100000}
                                step={100}
                                value={[minValue, maxValue]}
                                onChange={handleSliderChange}
                                tipFormatter={(value) => formatNumber(value)}
                            />
                        </div>
                        <div className={styles.vals}>
                            <div>
                                <p>Мин.</p>
                                <input
                                    type="text"
                                    value={formatNumber(minValue)}
                                    onChange={handleMinInputChange}
                                />
                            </div>
                            <div>
                                <p>Макс.</p>
                                <input
                                    type="text"
                                    value={formatNumber(maxValue)}
                                    onChange={handleMaxInputChange}
                                />
                            </div>
                        </div>
                        <div className={styles.radios}>



                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.btn1} type="button" onClick={handleClear}>
                                Очистить
                            </button>
                            <button className={styles.btn2} type="submit">
                                Применить
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalFilter;
