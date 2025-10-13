import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import reviewsData from '../../data/reviews.json'; 
import '../../styles/Reviews.css';
function Reviews() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const widgetRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    let retries = 3;
    const loadWidget = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://widget.clutch.co/static/js/widget.js';
        script.async = true;
        script.onload = () => {
          try {
            if (window.Clutch && window.Clutch.Widget) {
              window.Clutch.Widget.load(widgetRef.current);
              setIsLoading(false);
              console.log('Clutch widget loaded successfully');
            } else {
              throw new Error('Clutch Widget API not available');
            }
          } catch (err) {
            console.error('Widget initialization error:', err);
            if (retries > 0) {
              retries--;
              console.log(`Retrying widget load... (${retries} attempts left)`);
              setTimeout(loadWidget, 2000);
            } else {
              setError('Failed to initialize Clutch widget');
              setUseFallback(true);
              setIsLoading(false);
            }
          }
        };
        script.onerror = () => {
          console.error('Clutch widget script failed to load');
          if (retries > 0) {
            retries--;
            console.log(`Retrying widget load... (${retries} attempts left)`);
            setTimeout(loadWidget, 2000);
          } else {
            setError('Failed to load Clutch widget script');
            setUseFallback(true);
            setIsLoading(false);
          }
        };
        document.head.appendChild(script);

        return () => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
        };
      } catch (err) {
        console.error('Unexpected error loading widget:', err);
        setError('Unexpected error loading reviews');
        setUseFallback(true);
        setIsLoading(false);
      }
    };

    loadWidget();
  }, []);

  // Preload fallback review avatars
  useEffect(() => {
    if (useFallback && reviewsData) {
      reviewsData.forEach((review) => {
        if (review.reviewer?.avatar) {
          const img = new Image();
          img.src = review.reviewer.avatar;
        }
      });
    }
  }, [useFallback]);

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
          ) : error && useFallback ? (
            reviewsData && reviewsData.length > 0 ? (
              <div className="clutch-widget">
                {reviewsData.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          <img
                            src={review.reviewer?.avatar || '/placeholder.png'}
                            alt={t('reviews.reviewer_alt', {
                              name: review.reviewer?.name?.[currentLang] || 'Reviewer',
                              defaultValue: 'Reviewer avatar',
                            })}
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
            ) : (
              <p className="error">
                {t('reviews.error', { defaultValue: 'Failed to load reviews. Please try again later.' })}
              </p>
            )
          ) : error ? (
            <p className="error">
              {t('reviews.error', { defaultValue: 'Failed to load reviews. Please try again later.' })}
            </p>
          ) : (
            // هذا هو الجزء الذي تم تصحيحه - إضافة الـ widget الفعلي
            <div
              ref={widgetRef}
              className="clutch-widget"
              data-url="https://widget.clutch.co"
              data-widget-type="4"
              data-nofollow="true"
              data-expandifr="true"
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
              {t('reviews.button', { defaultValue: 'View All Reviews' })}
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}


export default Reviews;