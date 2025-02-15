import styles from "../../styles/Vacancies.module.scss";
import JobCard from "../../components/JobCard/JobCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { fetchVacancies } from "@/store/slices/vacancies/vacanciesSlice";
import Layout from "@/components/Layout/Layout";
import React from "react";
import Head from "next/head";

const Vacancy = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { vacancies } = useSelector((state) => state.vacancies);
  const language = useSelector((state) => state.language.selectedLanguage);
  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch, language]);

  return (
    <>
      <Head>
        <title>Вакансии | Найдите работу вашей мечты</title>
        <meta
          name="description"
          content="Ищете работу? Найдите актуальные вакансии в различных сферах и начните строить карьеру своей мечты с нами."
        />
        <meta
          name="keywords"
          content="вакансии, работа, поиск работы, трудоустройство, карьера, актуальные вакансии, новые вакансии"
        />

        <meta
          property="og:title"
          content="Вакансии | Найдите работу вашей мечты"
        />
        <meta
          property="og:description"
          content="Ищете работу? Мы предлагаем широкий выбор вакансий. Присоединяйтесь к нашей команде и начните строить свою карьеру!"
        />
        <meta property="og:image" content="/iskender_main.svg" />
        <meta property="og:url" content="https://iskender.kg/vacancies" />
        <meta property="og:type" content="website" />

        <meta name="instagram:card" content="summary_large_image" />
        <meta
          name="instagram:title"
          content="Вакансии | Найдите работу вашей мечты"
        />
        <meta
          name="instagram:description"
          content="Широкий выбор вакансий для карьерного роста. Найдите работу своей мечты и присоединяйтесь к профессиональной команде."
        />
        <meta name="instagram:image" content="/iskender_main.svg" />

        <link rel="canonical" href="https://iskender.kg/vacancies" />

        <link rel="icon" type="image/svg+xml" href="/iskender_main.svg" />
      </Head>

      <Layout>
        <div className={styles.jobList}>
          <div className={styles.title}>
            <h5>{t("vacancies.title")}</h5>
          </div>
          {vacancies?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Vacancy;
