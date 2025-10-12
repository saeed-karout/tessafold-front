import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/reviews.css';

function Reviews() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const widgetRef = useRef(null);

  useEffect(() => {
    // تحميل سكريبت Clutch widget
    const script = document.createElement('script');
    script.src = 'https://widget.clutch.co/static/js/widget.js';
    script.async = true;
    script.onload = () => {
      // إعادة تهيئة الـ widget بعد تحميل السكريبت
      if (window.Clutch && window.Clutch.Widget) {
        window.Clutch.Widget.load(widgetRef.current);
      }
    };
    document.head.appendChild(script);

    return () => {
      // تنظيف السكريبت عند إلغاء التثبيت
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="reviews-section" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="reviews-container">
        <div className="reviews-header">
          <h2 className="reviews-title">
            {t('reviews.title', { defaultValue: 'What Our Clients Say' })}
          </h2>
          <p className="reviews-subtitle">
            {t('reviews.subtitle', { defaultValue: 'Discover why businesses trust us with their digital transformation journey' })}
          </p>
        </div>

        <div className="reviews-content">
          {/* Clutch Widget */}
          <div 
            ref={widgetRef}
            className="clutch-widget"
            data-url="https://widget.clutch.co"
            data-widget-type="4"
            data-height="auto"
            data-nofollow="false"
            data-expandifr="true"
            data-scale="100"
            data-reviews="328859,328044,327582,269904,267544"
            data-clutchcompany-id="1782053"
          ></div>

          {/* تقييمات إضافية مخصصة */}
          <div className="custom-reviews">
            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    <img src="/users.png" alt="Client" />
                  </div>
                  <div className="reviewer-details">
                    <h4 className="reviewer-name">
                      {t('reviews.client1.name', { defaultValue: 'Sarah Johnson' })}
                    </h4>
                    <p className="reviewer-company">
                      {t('reviews.client1.company', { defaultValue: 'Tech Solutions Inc.' })}
                    </p>
                  </div>
                </div>
                <div className="review-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">5.0</span>
                </div>
              </div>
              <p className="review-content">
                {t('reviews.client1.content', { 
                  defaultValue: 'Tessafold delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is remarkable.' 
                })}
              </p>
            </div>

            <div className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    <img src="/users.png" alt="Client" />
                  </div>
                  <div className="reviewer-details">
                    <h4 className="reviewer-name">
                      {t('reviews.client2.name', { defaultValue: 'Michael Chen' })}
                    </h4>
                    <p className="reviewer-company">
                      {t('reviews.client2.company', { defaultValue: 'Global Finance Ltd.' })}
                    </p>
                  </div>
                </div>
                <div className="review-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">5.0</span>
                </div>
              </div>
              <p className="review-content">
                {t('reviews.client2.content', { 
                  defaultValue: 'The mobile app developed by Tessafold has significantly improved our customer engagement. Their team was professional and delivered on time.' 
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="reviews-cta">
          <p className="cta-text">
            {t('reviews.cta', { defaultValue: 'Join our satisfied clients and start your project today' })}
          </p>
            <a href="https://clutch.co/profile/tessafold#review-328859" target='_blank'>
          <button className="reviews-button">

            {t('reviews.button', { defaultValue: 'View All Reviews' })}
          </button>
            </a>
        </div>
      </div>
    </section>
  );
}

export default Reviews;