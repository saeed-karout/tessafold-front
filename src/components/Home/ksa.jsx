import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ksaData from '../../data/ksa.json';
import "../../styles/ksa.css";

function KSA() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1180);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Log ksaData for debugging
  useEffect(() => {
    // console.log('ksaData:', ksaData);
    if (!ksaData?.ksa_section) {
      console.error('Invalid ksaData:', ksaData);
    }
  }, []);

  // Preload images
  useEffect(() => {
    const images = ['/images/ksa/ksa.webp', ...(ksaData.ksa_section?.items || []).map(item => item.image)];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Set default selected item
  useEffect(() => {
    if (ksaData.ksa_section?.items?.length > 0) {
      setSelectedItem(ksaData.ksa_section.items[0]);
    }
  }, []);

  // Handle item click
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diffX = touchStartX - touchEndX;
      const threshold = 50; // Minimum swipe distance
      const items = ksaData.ksa_section?.items || [];
      const currentIndex = items.findIndex(item => item.id === selectedItem?.id);

      if (diffX > threshold) {
        // Swipe left (next item)
        const nextIndex = (currentIndex + 1) % items.length;
        setSelectedItem(items[nextIndex]);
      } else if (diffX < -threshold) {
        // Swipe right (previous item)
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        setSelectedItem(items[prevIndex]);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section
      className='ksa-main'
      
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      {isMobile ? (
        <div className="ksa-mobile" >

          <img src="/images/ksa/ksa.webp"  className="icon-ksa" alt="Saudi Vision 2030"  />

           <div className="subtitle-ksa"  style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr'}} >
                {ksaData.ksa_section?.title?.[currentLang] || 'Vision Alignment'}
                <span>{ksaData.ksa_section?.aligns_with_mobile?.[currentLang] || 'Aligned with'}</span>
                <p>{ksaData.ksa_section?.vision_2030?.[currentLang] || 'Saudi Vision 2030'}</p>
              </div>

          
          <div className="selected-item" >
            {selectedItem && (
              <>
                {/* <img
                  src={selectedItem.image || '/images/ksa/bg.jpg'}
                  className="selected-item-image"
                  alt={selectedItem.text?.[currentLang] || 'Item'}
                /> */}

                 <img
                  src='/images/ksa/bg.jpg'
                  className="selected-item-image"
                  alt={selectedItem.text?.[currentLang] || 'Item'}
                />
                <div className="selected-item-title">
                  <span className="number">
                    {(ksaData.ksa_section?.items.findIndex(item => item.id === selectedItem.id) + 1).toString().padStart(2, '0')}.
                  </span>
                  <span>{selectedItem.text?.[currentLang] || 'Item'}</span>
                </div>
                <div className="selected-item-description">
                  {selectedItem.details?.[currentLang] || 'No description available'}
                </div>
              </>
            )}
          </div>
          <div className="carousel-dots">
            {(ksaData.ksa_section?.items || []).map((item, index) => (
              <span
                key={item.id || index}
                className={`dot ${selectedItem?.id === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="ksa-left">
            <div className="bg-ksa">
              <div className="text-ksa">
                <span>
                  {selectedItem
                    ? selectedItem.details?.[currentLang] || selectedItem.text?.[currentLang]
                    : ksaData.ksa_section?.left_text?.[currentLang] || 'Our Vision'}
                </span>
              </div>
            </div>
          </div>
          <div className="ksa-right" style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
            <div className="top-right">
              <div className="subtitle-ksa">
                {ksaData.ksa_section?.title?.[currentLang] || 'Vision Alignment'}
                <span>{ksaData.ksa_section?.aligns_with?.[currentLang] || 'Aligned with'}</span>
                <p>{ksaData.ksa_section?.vision_2030?.[currentLang] || 'Saudi Vision 2030'}</p>

              </div>
              <img src="/images/ksa/ksa.webp" className="icon-ksa" alt="Saudi Vision 2030" />
            </div>
            <div className="bottom-right">
              {(ksaData.ksa_section?.items || []).map((item, index) => (
                <div
                  key={item.id || index}
                  className={`item-ksa ${selectedItem?.id === item.id ? 'active' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="number">{index + 1 < 10 ? `${index + 1}.` : `${index + 1}.`}</div>
                  <div className="text">
                    <span>{item.text?.[currentLang] || 'Item'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default KSA;