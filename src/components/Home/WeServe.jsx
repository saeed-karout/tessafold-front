import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import weServeData from '../../data/we-serve.json';
import "../../styles/weServe.css";

function WeServe() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const [screenSize, setScreenSize] = useState('desktop'); // desktop, tablet, mobile, tiny

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 300) {
        setScreenSize('tiny');
      } else if (width <= 768) {
        setScreenSize('mobile');
      } else if (width <= 1199) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Log weServeData for debugging
  useEffect(() => {
    // console.log('weServeData:', weServeData);
    // console.log('Current screen size:', screenSize);
    if (!weServeData?.we_serve) {
      console.error('Invalid weServeData:', weServeData);
    }
  }, [screenSize]);

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
        {(weServeData.we_serve?.cards || []).map((card, index) => {
          // تحديد نمط الخلفية بناءً على حجم الشاشة وترتيب السطر
          let bgClass = 'without-bg'; // default
          
          const rowIndex = Math.floor(index / getCardsPerRow(screenSize));
          const positionInRow = index % getCardsPerRow(screenSize);
          const isEvenRow = rowIndex % 2 === 0;

          if (screenSize === 'desktop') {
            // Desktop: 3 كروت - السطر الأول: مع|بدون|مع، الثاني: بدون|مع|بدون
            if (isEvenRow) {
              bgClass = positionInRow === 1 ? 'without-bg' : 'with-bg';
            } else {
              bgClass = positionInRow === 1 ? 'with-bg' : 'without-bg';
            }
          } else if (screenSize === 'tablet' || screenSize === 'mobile') {
            // Tablet/Mobile: 2 كروت - السطر الأول: مع|بدون، الثاني: بدون|مع
            if (isEvenRow) {
              bgClass = positionInRow === 0 ? 'with-bg' : 'without-bg';
            } else {
              bgClass = positionInRow === 0 ? 'without-bg' : 'with-bg';
            }
          } else if (screenSize === 'tiny') {
            // Tiny: 1 كارت - تبديل مستمر
            bgClass = isEvenRow ? 'with-bg' : 'without-bg';
          }

          return (
            <div
              key={card.id || index}
              className={`card-serve ${bgClass} ${screenSize !== 'desktop' ? 'mobile' : ''}`}
            >
              <div className="card-content">
                <img src={card.icon || '/placeholder.png'} alt={card.topic?.[currentLang] || 'Service'} />
                <div className="topic-serve">
                  {card.topic?.[currentLang] || 'Untitled Service'}
                </div>
                {screenSize === 'desktop' && (
                  <div className="description-serve">
                    {card.description?.[currentLang] || 'No description available'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Helper function to determine cards per row based on screen size
function getCardsPerRow(screenSize) {
  switch (screenSize) {
    case 'desktop':
      return 3;
    case 'tablet':
    case 'mobile':
      return 2;
    case 'tiny':
      return 1;
    default:
      return 3;
  }
}

export default WeServe;