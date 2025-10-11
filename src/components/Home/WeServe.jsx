import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import weServeData from '../../data/we-serve.json';
import "../../styles/weServe.css";

function WeServe() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const [isMobile, setIsMobile] = useState(false);

  // كشف حجم الشاشة
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Log weServeData for debugging
  useEffect(() => {
    console.log('weServeData:', weServeData);
    if (!weServeData?.we_serve) {
      console.error('Invalid weServeData:', weServeData);
    }
  }, []);

  // Preload images
  useEffect(() => {
    (weServeData.we_serve?.cards || []).forEach((card) => {
      const img = new Image();
      img.src = card.icon;
    });
  }, []);

  return (
    <section className='we-serve-main' style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="top-serve">
        <div className="title-serve">
          {weServeData.we_serve?.title_part1?.[currentLang] || 'We Serve'}
          <span> {weServeData.we_serve?.title_part2?.[currentLang] || 'Industries'}</span>
        </div>
        <div className="subtitle-serve">
          {weServeData.we_serve?.subtitle?.[currentLang] || 'Our expertise spans multiple sectors.'}
        </div>
      </div>
      <div className="frame-serve">
        {(weServeData.we_serve?.cards || []).map((card, index) => (
          <div
            key={card.id || index}
            className={`card-serve ${index % 2 === 0 ? 'with-bg' : 'without-bg'} ${isMobile ? 'mobile' : ''}`}
          >
            <div className="card-content">
              <img src={card.icon || '/placeholder.png'} alt={card.topic?.[currentLang] || 'Service'} />
              <div className="topic-serve">
                {card.topic?.[currentLang] || 'Untitled Service'}
              </div>
              {!isMobile && (
                <div className="description-serve">
                  {card.description?.[currentLang] || 'No description available'}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeServe;