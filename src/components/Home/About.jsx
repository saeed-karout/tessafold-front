import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import aboutData from '../../data/about.json';
import '../../styles/about.css';

function About() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  // Log aboutData for debugging
  useEffect(() => {
    console.log('aboutData:', aboutData);
    if (!aboutData?.team) {
      console.error('Invalid aboutData:', aboutData);
    }
  }, []);

  // Preload arrow image
  useEffect(() => {
    const img = new Image();
    img.src = '/arrow-left.svg';
  }, []);

  const team = aboutData.team || [];
  const currentMember = team[currentIndex] || {};

  const handleNext = () => {
    setAnimationClass('animate-out');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (team.length || 1));
    setTimeout(() => {
      setAnimationClass('animate-in');
    }, 200);
  };

  const handlePrev = () => {
    setAnimationClass('animate-out');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (team.length || 1)) % (team.length || 1));
    setTimeout(() => {
      setAnimationClass('animate-in');
    }, 200);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass('');
    }, 400);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="main-about" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="title-about">
        {t('about_us') || 'About Us'}
        <span>{t('about_span') || 'Our Team'}</span>
      </div>

      <div className="frame-about">
        <img
          src="/arrow-left.svg"
          className="arrow-left"
          width={40}
          height={40}
          alt={t('about.arrowAlt') || 'Previous Member'}
          onClick={handlePrev}
          style={{ cursor: 'pointer' }}
        />
        <div
          className={`content-about ${animationClass}`}
          style={{
            '--slide-direction': currentLang === 'ar' ? (animationClass.includes('out') ? 'right' : 'left') : (animationClass.includes('out') ? 'left' : 'right'),
          }}
        >
          <iframe
            key={currentMember.id || currentIndex}
            src={currentMember.video || ''}
            width="926"
            height="404"
            style={{ borderRadius: '8px', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={t('about.videoTitle', { name: currentMember.name?.[currentLang] || 'Team Member' })}
          ></iframe>
          <div className="details-for-video">
            <div className="name">
              <span>{currentMember.name?.[currentLang] || 'Unknown Member'}, </span>
              {currentMember.careerLevel?.[currentLang] || 'Unknown Level'}
            </div>
            <div className="technology">
              {t('about.technologies') || 'Technologies'} | {(currentMember.technology?.[currentLang] || []).join(', ') || 'None'}
            </div>
          </div>
        </div>
        <img
          src="/arrow-left.svg"
          className="arrow-right"
          width={40}
          height={40}
          alt={t('about.arrowAlt') || 'Next Member'}
          onClick={handleNext}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </section>
  );
}

export default About;