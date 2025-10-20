import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import reviewsData from '../../data/reviews.json'; 
import '../../styles/Reviews.css';

function Reviews() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const widgetRef = useRef(null);
  const scriptRef = useRef(null); // لتتبع السكريبت
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  // دالة تحميل الـ widget مع retries
  const loadWidget = useCallback(async (retries = 3) => {
    if (retries <= 0) {
      setError('Failed to load Clutch widget after retries');
      setUseFallback(true);
      setIsLoading(false);
      return;
    }

    try {
      // إزالة السكريبت السابق إن وجد
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }

      const script = document.createElement('script');
      script.src = 'https://widget.clutch.co/static/js/widget.js';
      script.async = true;
      scriptRef.current = script;

      script.onload = () => {
        // انتظار قصير للتأكد من تحميل CLUTCHCO
        setTimeout(() => {
          if (window.CLUTCHCO) {
            window.CLUTCHCO.Init(); // التهيئة السليمة
            console.log('Clutch widget initialized successfully');
            setIsLoading(false);
          } else {
            throw new Error('CLUTCHCO not available');
          }
        }, 500);
      };

      script.onerror = () => {
        console.error('Clutch widget script failed to load');
        // Retry
        setTimeout(() => loadWidget(retries - 1), 3000); // زيادة الوقت
      };

      document.head.appendChild(script);
    } catch (err) {
      console.error('Unexpected error:', err);
      setTimeout(() => loadWidget(retries - 1), 3000);
    }
  }, []);

  useEffect(() => {
    loadWidget();

    // تنظيف عند unmount
    return () => {
      if (window.CLUTCHCO) {
        window.CLUTCHCO.Destroy(); // تدمير الـ widget
      }
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, [loadWidget]);

  // Preload avatars للفallback
  useEffect(() => {
    if (useFallback && reviewsData) {
      reviewsData.forEach((review) => {
        if (review.reviewer?.avatar) {
          const img = new Image();
          img.src = review.reviewer.avatar;
          img.onerror = () => console.warn(`Failed to preload avatar: ${review.reviewer.avatar}`);
        }
      });
    }
  }, [useFallback]);

  // عرض fallback إذا فشل التحميل
  if (useFallback && reviewsData && reviewsData.length > 0) {
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
            <div className="clutch-widget fallback">
              {reviewsData.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        <img
                          src={review.reviewer?.avatar || '/images/placeholder-avatar.png'} // fallback محلي
                          alt={t('reviews.reviewer_alt', {
                            name: review.reviewer?.name?.[currentLang] || 'Reviewer',
                            defaultValue: 'Reviewer avatar',
                          })}
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder-avatar.png'; // fallback إضافي
                          }}
                        />
                      </div>
                      <div className="reviewer-details">
                        <h4>{review.reviewer?.name?.[currentLang] || 'Anonymous'}</h4>
                        <p>{review.reviewer?.role?.[currentLang] || 'Client'}</p>
                      </div>
                    </div>
                    <div className="review-rating">
                      <div className="stars">
                        {'★'.repeat(review.rating || 0)}
                        {'☆'.repeat(5 - (review.rating || 0))}
                      </div>
                      <div className="rating-text">{review.date || 'N/A'}</div>
                    </div>
                  </div>
                  <p className="review-content">{review.content?.[currentLang] || 'No review content'}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reviews-cta">
            <p className="cta-text">
              {t('reviews.cta', { defaultValue: 'Join our satisfied clients and start your project today' })}
            </p>
            <a href="https://clutch.co/profile/tessafold#reviews" target="_blank" rel="noopener noreferrer">
              <button className="reviews-button">
                {t('reviews.btn', { defaultValue: 'View All Reviews' })}
              </button>
            </a>
          </div>
        </div>
      </section>
    );
  }

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
          {isLoading ? (
            <p className="loading">
              {t('reviews.loading', { defaultValue: 'Loading reviews...' })}
            </p>
          ) : error ? (
            <p className="error">
              {t('reviews.error', { defaultValue: 'Failed to load reviews. Please try again later.' })}
            </p>
          ) : (
            <div
              ref={widgetRef}
              className="clutch-widget"
              data-url="https://widget.clutch.co"
              data-widget-type="4"
              data-nofollow="true"
              data-expandifr="true"
              data-iframe="true"  // إضافة لتجنب hydration issues
              data-scale="100"
              data-primary-color="#FFB130"
              data-secondary-color="#39797f"
              data-reviews="2231946,2228229,2228148,2215763,2214541,2214305,2211821,2210293,2208659,2207514,2204852,2204421"
              data-clutchcompany-id="1782053"
            />
          )}
        </div>

        <div className="reviews-cta">
          <p className="cta-text">
            {t('reviews.cta', { defaultValue: 'Join our satisfied clients and start your project today' })}
          </p>
          <a href="https://clutch.co/profile/tessafold#reviews" target="_blank" rel="noopener noreferrer">
            <button className="reviews-button">
              {t('reviews.btn', { defaultValue: 'View All Reviews' })}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Reviews;