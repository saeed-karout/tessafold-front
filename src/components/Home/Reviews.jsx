import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import reviewsData from '../../data/reviews.json';
import '../../styles/Reviews.css';

function Reviews() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';

  // تحميل صور الـ avatars مسبقاً
  useEffect(() => {
    if (reviewsData) {
      reviewsData.forEach((review) => {
        if (review.reviewer?.avatar) {
          const img = new Image();
          img.src = review.reviewer.avatar;
          img.onerror = () => {
            // console.warn(`Failed to preload avatar: ${review.reviewer.avatar}`);
          };
        }
      });
    }
  }, []);

  return (
    <section className="reviews-section" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="reviews-container">
        <div className="reviews-header">
          <h2 className="reviews-title">
            {t('reviews.title', { defaultValue: 'What Our Clients Say' })}
          </h2>
          <p className="reviews-subtitle">
            {t('reviews.subtitle', {
              defaultValue: 'Discover why businesses trust us with their digital transformation journey',
            })}
          </p>
        </div>

        <div className="reviews-content">
          {reviewsData && reviewsData.length > 0 ? (
            <div className="clutch-widget">
              {reviewsData.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        <img
                          src={review.reviewer?.avatar || '/images/placeholder-avatar.png'}
                          alt={t('reviews.reviewer_alt', {
                            name: review.reviewer?.name?.[currentLang] || 'Reviewer',
                            defaultValue: 'Reviewer avatar',
                          })}
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder-avatar.png';
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
                  <p className="review-content">
                    {review.content?.[currentLang] || 'No review content'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="error">
              {t('reviews.error', { defaultValue: 'No reviews available.' })}
            </p>
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