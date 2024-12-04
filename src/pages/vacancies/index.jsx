import styles from "../../styles/Vacancies.module.scss";
import JobCard from "../../components/JobCard/JobCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {fetchVacancies} from "@/store/slices/vacancies/vacanciesSlice";
import Layout from "@/components/Layout/Layout";
import React from 'react';

const Vacancy = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {vacancies} = useSelector((state) => state.vacancies);

    useEffect(() => {
        dispatch(fetchVacancies())
    }, [])

    return (
        <Layout>
            <div className={styles.jobList}>
                <div className={styles.title}>
                    <h5>{t("vacancies.title")}</h5>
                </div>
                {vacancies?.map((job) => (
                    <JobCard key={job.id} job={job}/>
                ))}
            </div>
        </Layout>
    )
}

export default Vacancy;