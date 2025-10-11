import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typed from 'typed.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import partnersData from '../../data/partners.json';
import '../../styles/Hero.css';

function HeroSection() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language || 'en';
  // Defensive: ensure partnersData is an array before mapping
  const partners = Array.isArray(partnersData) ? partnersData : [];

  // Initialize Typed.js for yellow-hero animation
  useEffect(() => {
    const options = {
      strings: [
        t('hero.animatedText.ai'),
        t('hero.animatedText.ml'),
        t('hero.animatedText.software')
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: '|',
      cursorColor: '#FFB130' // Match yellow-hero color
    };

    const typed = new Typed('.yellow-hero', options);

    return () => {
      typed.destroy(); // Clean up Typed.js instance
    };
  }, [t, i18n.language]); // Re-run if language changes

  return (
    <div className="Hero" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="section1-hero">
        <span>{t('hero.subtitle')}</span>
        <div className="title-hero">{t('hero.title')}</div>
        <div className="yellow-hero-wrapper">
          <span className="yellow-hero"></span>
        </div>
        <p>{t('hero.description')}</p>
      </div>

      <div className="section2-hero">
        <button
          className="btn-contact-hero"
          onClick={() => navigate('/contact')}
          aria-label={t('hero.buttonAriaLabel')}
        >
          <span>{t('hero.buttonText')}</span>
        </button>
      </div>

      <div className="section3-hero" style={{ direction: currentLang === 'ar' ? 'ltr' : 'ltr' }}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={104}
          slidesPerView={7}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="partners-swiper"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <div className="partner-slide">
                <img
                  src={partner.image}
                  alt={t('hero.partnerAlt', { name: partner.name })}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HeroSection;