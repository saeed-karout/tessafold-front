import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import packageTranslations from '../../data/packageComponent.json';
import "../../styles/main-package.css";

function PackageComponent() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';

  // Log packageTranslations for debugging
  useEffect(() => {
    // console.log('packageTranslations:', packageTranslations);
    if (!packageTranslations?.package) {
      console.error('Invalid packageTranslations:', packageTranslations);
    }
  }, []);

  // Preload images مع تحسين للأداء
  useEffect(() => {
    const images = [
      '/icons/lang-code/azure.png',
      '/icons/lang-code/python.svg',
      '/icons/lang-code/js.svg',
      '/icons/lang-code/stripe.png',
      '/icons/lang-code/react.svg',
      '/icons/lang-code/java.svg',
      '/icons/lang-code/figma.svg',
      '/icons/lang-code/AWS.png',
      '/icons/lang-code/node.png',
      '/icons/lang-code/flutter.png',
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => console.log(`Image loaded: ${src}`);
    });
  }, []);

  return (
    <div 
      className='tech-package-main' 
      style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}
    >
      <div className="tech-package-content">
        {/* المحتوى المركزي */}
        <div className="tech-content-center">
          <div className="tech-top-section">
            <div className="tech-main-title">
              {packageTranslations.package?.title_part1?.[currentLang] || 'Our Technology'}
              <span className="tech-highlight">
                {" "}{packageTranslations.package?.title_part2?.[currentLang] || 'Stack'}
              </span>
            </div>
            <div className="tech-subtitle">
              {packageTranslations.package?.subtitle?.[currentLang] || 'Advanced solutions for your needs.'}
            </div>
          </div>
          
          <Link to={'/contact-us'}>
            <div className="tech-contact-btn">
              <span className="tech-btn-text">
                {packageTranslations.package?.button?.[currentLang] || 'Contact Us'}
              </span>
            </div>
          </Link>
        </div>

        {/* ========== DESKTOP & TABLET - الأيقونات المطلقة ========== */}
        <div className="tech-icon-frame tech-pos-1 tech-float-anim">
          <img src="/icons/lang-code/azure.png" alt="Azure" loading="lazy" />
        </div>
        <div className="tech-icon-frame tech-pos-2 tech-float-anim tech-delay-1">
          <img src="/icons/lang-code/python.svg" alt="Python" loading="lazy" />
        </div>
        <div className="tech-icon-frame tech-pos-3 tech-float-anim tech-delay-2">
          <img src="/icons/lang-code/js.svg" alt="JavaScript" loading="lazy" />
        </div>
        <div className="tech-icon-frame tech-pos-4 tech-float-anim tech-delay-3">
          <img src="/icons/lang-code/stripe.png" alt="Stripe" loading="lazy" />
        </div>
        <div className="tech-icon-frame tech-pos-5 tech-float-anim tech-delay-4">
          <img src="/icons/lang-code/react.svg" alt="React" loading="lazy" />
        </div>
        <div className="tech-icon-frame tech-pos-6 tech-float-anim tech-delay-5">
          <img src="/icons/lang-code/java.svg" alt="Java" loading="lazy" />
        </div>
        <div className="tech-icon-frame tech-pos-7 tech-float-anim tech-delay-6">
          <img src="/icons/lang-code/figma.svg" alt="Figma" loading="lazy" />
        </div>
        <div className="tech-icon-frame tech-pos-8 tech-float-anim tech-delay-7">
          <img src="/icons/lang-code/AWS.png" alt="AWS" loading="lazy" />
        </div>
        <div className="tech-icon-frame tech-pos-9 tech-float-anim tech-delay-8">
          <img src="/icons/lang-code/node.png" alt="Node.js" loading="lazy" />
        </div>
        <div className="tech-icon-frame tech-pos-10 tech-float-anim tech-delay-9">
          <img src="/icons/lang-code/flutter.png" alt="Flutter" loading="lazy" />
        </div>

        {/* ========== MOBILE - CSS Grid + دائرة متوهجة ========== */}
        <div className="tech-icon-grid">
          {/* 6 أيقونات فقط - التوزيعة المثالية */}
          <div className="tech-icon-frame tech-pos-1">
            <img src="/icons/lang-code/azure.png" alt="Azure" loading="lazy" />
          </div>
          
          <div className="tech-icon-frame tech-pos-2">
            <img src="/icons/lang-code/react.svg" alt="React" loading="lazy" />
          </div>
          
          <div className="tech-icon-frame tech-pos-3">
            <img src="/icons/lang-code/python.svg" alt="Python" loading="lazy" />
          </div>
          
          <div className="tech-icon-frame tech-pos-9">
            <img src="/icons/lang-code/node.png" alt="Node.js" loading="lazy" />
          </div>
          
          <div className="tech-icon-frame tech-pos-5">
            <img src="/icons/lang-code/js.svg" alt="JavaScript" loading="lazy" />
          </div>
          
          <div className="tech-icon-frame tech-pos-10">
            <img src="/icons/lang-code/flutter.png" alt="Flutter" loading="lazy" />
          </div>
        </div>

        {/* الدائرة المتوهجة - تظهر في الموبايل فقط */}
        <div className="tech-glow-circle"></div>
      </div>
    </div>
  );
}

export default PackageComponent;
