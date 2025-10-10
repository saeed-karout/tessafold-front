import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import aboutData from '../../data/about.json';
import '../../styles/about.css';

function About() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  const team = aboutData.team;
  const currentMember = team[currentIndex];

  const handleNext = () => {
    setAnimationClass('animate-out');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % team.length);
    setTimeout(() => {
      setAnimationClass('animate-in');
    }, 200); // Match animation duration
  };

  const handlePrev = () => {
    setAnimationClass('animate-out');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + team.length) % team.length);
    setTimeout(() => {
      setAnimationClass('animate-in');
    }, 200); // Match animation duration
  };

  // Clear animation class after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass('');
    }, 400); // Total animation duration (200ms out + 200ms in)
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="main-about" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="title-about">
        {t('about_us')}
        <span>{t('about_span')}</span>
      </div>

      <div className="frame-about">
        <img
          src="/arrow-left.svg"
          className="arrow-left"
          width={40}
          height={40}
          alt={t('about.arrowAlt')}
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
            key={currentMember.id} // Force re-render to prevent old video
            src={currentMember.video}
            width="926"
            height="404"
            style={{ borderRadius: '8px', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={t('about.videoTitle', { name: currentMember.name[currentLang] })}
          ></iframe>
          <div className="details-for-video">
            <div className="name">
              <span>{currentMember.name[currentLang]}, </span>
              {currentMember.careerLevel[currentLang]}
            </div>
            <div className="technology">
              {t('about.technologies')} | {currentMember.technology[currentLang].join(', ')}
            </div>
          </div>
        </div>
        <img
          src="/arrow-left.svg"
          className="arrow-right"
          width={40}
          height={40}
          alt={t('about.arrowAlt')}
          onClick={handleNext}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </section>
  );
}

export default About;