import i18n from "i18next";
import faTranslation from './utils/faTranslation.json';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        fa: { translation: faTranslation },
    },
    lng: localStorage.getItem('lang') || 'en', // زبان پیش‌فرض
    fallbackLng: 'en', // زبان fallback
    interpolation: {
        escapeValue: false, // از کدهای HTML در متن جلوگیری می‌کند
    },
    debug: true, // برای نمایش پیام‌های دیباگ در کنسول
});

export default i18n;
