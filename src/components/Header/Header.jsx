import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import i18n from "../../i18n";
import styles from "./Header.module.scss";
import {Fade} from "react-slideshow-image";
import Link from "next/link";

const Header = () => {
    const {t} = useTranslation();
    const selectedLanguage = useSelector(
        (state) => state.language.selectedLanguage
    );

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const settings = {
        duration: 10000,
        transitionDuration: 3000,
        infinite: true,
        indicators: false,
        arrows: false,
    };

    const backgrounds = [
        "https://res.cloudinary.com/dxlerkcn8/image/upload/v1732253899/Property_1_Default_r4ewp3.png",
        "https://res.cloudinary.com/dxlerkcn8/image/upload/v1732253899/Property_1_Variant2_rodhvo.png",
        "https://res.cloudinary.com/dxlerkcn8/image/upload/v1732253899/Property_1_Variant4_mks8c3.png",
        "https://res.cloudinary.com/dxlerkcn8/image/upload/v1732253899/Property_1_Variant3_blp2jz.png",
        "https://res.cloudinary.com/dxlerkcn8/image/upload/v1732253899/Property_1_Variant5_f4dr1j.png",
        "https://res.cloudinary.com/dxlerkcn8/image/upload/v1732253899/Property_1_Variant5_f4dr1j.png"
    ];

    return (
        <section className={styles.sliderContainer}>
            <Fade {...settings}>
                {backgrounds.map((bg, index) => (
                    <div
                        key={index}
                        className={styles.bgSlide}
                        style={{backgroundImage: `url("${bg}")`}}
                    />
                ))}
            </Fade>

            <div className={styles.content}>
                <div className={styles.container}>
          <span>
            <h1>{t("header.title")}</h1>
            <h4>{t("header.subtitle")}</h4>
          </span>
                    <section className={styles.b2b}>
                        <p>{t("header.b2b")}</p>
                    </section>
                    <p className={styles.desk}>{t("header.description")}</p>
                    <Link href={"/page"} className={styles.btn_to_category}>
                        {t("header.toCatalog")}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Header;
