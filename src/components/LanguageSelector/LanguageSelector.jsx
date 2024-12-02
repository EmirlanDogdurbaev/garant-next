"use client"

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import i18n from '@/i18n';
import { fetchLanguages, setSelectedLanguage } from '@/store/slices/languages/languageSlice';

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const { languages, selectedLanguage, loading, error } = useSelector((state) => state.language);

  // Получаем список языков при загрузке компонента
  useEffect(() => {
    dispatch(fetchLanguages());
  }, [dispatch]);


  const handleChange = (event) => {
    const selectedLang = event.target.value;
    dispatch(setSelectedLanguage(selectedLang)); // Обновляем Redux-состояние
    i18n.changeLanguage(selectedLang); // Смена языка в i18next
  };

 
  

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <select value={selectedLanguage} onChange={handleChange}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
