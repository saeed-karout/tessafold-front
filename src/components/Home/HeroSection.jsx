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
  const currentLang = i18n.language?.split('-')[0] || 'en';

  // Preload partner images
  useEffect(() => {
    (partnersData || []).forEach((partner) => {
      const img = new Image();
      img.src = partner.image;
    });
  }, []);

  // Initialize Typed.js for yellow-hero animation
  useEffect(() => {
    const options = {
      strings: [
        t('hero.animatedText.ai') || 'AI Development',
        t('hero.animatedText.ml') || 'Machine Learning',
        t('hero.animatedText.software') || 'Software Development',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: '|',
      cursorColor: '#FFB130',
    };

    const typed = new Typed('.yellow-hero', options);

    return () => {
      typed.destroy();
    };
  }, [t, i18n.language]);

  return (
    <div className="Hero" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="section1-hero">
        <span>{t('hero.subtitle') || 'Welcome'}</span>
        <div className="title-hero">{t('hero.title') || 'Innovate with Us'}</div>
        <div className="yellow-hero-wrapper" style={{ direction: currentLang === 'ar' ? 'ltr' : 'ltr' }}>
          <span className="yellow-hero"></span>
        </div>
        <p>{t('hero.description') || 'We provide cutting-edge solutions.'}</p>
      </div>

      <div className="section2-hero">
        <button
          className="btn-contact-hero"
          onClick={() => navigate('/contact')}
          aria-label={t('hero.buttonAriaLabel') || 'Contact Us'}
        >
          <span>{t('hero.buttonText') || 'Get in Touch'}</span>
        </button>
      </div>

      <div className="section3-hero" style={{ direction: 'ltr' }}>
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
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 104,
            },
          }}
        >
          {(partnersData || []).map((partner) => (
            <SwiperSlide key={partner.id || Math.random()}>
              <div className="partner-slide">
                <img
                  src={partner.image}
                  alt={t('hero.partnerAlt', { name: partner.name?.[currentLang] || 'Partner' })}
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