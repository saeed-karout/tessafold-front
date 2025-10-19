import { useEffect } from 'react';
import axios from 'axios';
import i18n from '../i18n';

const useAutoLanguage = () => {
  useEffect(() => {
    // تحقق مما إذا كانت اللغة محفوظة في localStorage
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      document.body.setAttribute('data-lang', savedLang);
      return;
    }

    // اكتشاف اللغة بناءً على الموقع الجغرافي
    const detectLanguage = async () => {
      try {
        const { data } = await axios.get('https://ipapi.co/json/');
        const countryCode = data.country_code?.toUpperCase();
        console.log('Detected country:', countryCode);

        // قائمة الدول الناطقة بالعربية
        const ARABIC_COUNTRIES = [
          'SA', // السعودية
          'KW', // الكويت
          'QA', // قطر
          'SY', // سوريا
          'IQ', // العراق
          'BH', // البحرين
          'LY', // ليبيا
          'OM', // عمان
          'EG', // مصر
          'AE', // الإمارات
          'JO', // الأردن
          'YE', // اليمن
          'PS', // فلسطين
        ];

        // قائمة دول DACH (ألمانيا، النمسا، سويسرا)
        const DACH_COUNTRIES = ['DE', 'AT', 'CH'];

        let selectedLang = 'en'; // اللغة الافتراضية

        if (ARABIC_COUNTRIES.includes(countryCode)) {
          selectedLang = 'ar';
        } else if (DACH_COUNTRIES.includes(countryCode)) {
          selectedLang = 'de';
        }

        i18n.changeLanguage(selectedLang);
        localStorage.setItem('lang', selectedLang);
        document.body.setAttribute('data-lang', selectedLang);
      } catch (error) {
        console.error('Geo detection failed:', error);
        // الرجوع إلى لغة المتصفح كبديل
        const browserLang = navigator.language || navigator.userLanguage;
        const fallbackLang = browserLang.startsWith('ar') ? 'ar' : browserLang.startsWith('de') ? 'de' : 'en';
        i18n.changeLanguage(fallbackLang);
        localStorage.setItem('lang', fallbackLang);
        document.body.setAttribute('data-lang', fallbackLang);
      }
    };

    detectLanguage();
  }, []);
};

export default useAutoLanguage;