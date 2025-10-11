import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ksaData from '../data/ksa.json';
import "../styles/ksa.css";

function KSA() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const [selectedItem, setSelectedItem] = useState(null);

  // Log ksaData for debugging
  useEffect(() => {
    console.log('ksaData:', ksaData);
    if (!ksaData?.ksa_section) {
      console.error('Invalid ksaData:', ksaData);
    }
  }, []);

  // Preload images
  useEffect(() => {
    const img = new Image();
    img.src = '/images/ksa/ksa.webp';
  }, []);

  // تحديد العنصر الافتراضي عند التحميل
  useEffect(() => {
    if (ksaData.ksa_section?.items?.length > 0) {
      setSelectedItem(ksaData.ksa_section.items[0]);
    }
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <section className='ksa-main' style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="ksa-left">
        <div className="bg-ksa">
          <div className="text-ksa">
            <span>
              {selectedItem 
                ? selectedItem.details?.[currentLang] || selectedItem.text?.[currentLang]
                : ksaData.ksa_section?.left_text?.[currentLang] || 'Our Vision'
              }
            </span>
          </div>
        </div>
      </div>
      <div className="ksa-right">
        <div className="top-right">
          <img src="/images/ksa/ksa.webp" className='icon-ksa' alt="Saudi Vision 2030" />
          <div className="subtitle-ksa">
            {ksaData.ksa_section?.title?.[currentLang] || 'Vision Alignment'}
            <span>{ksaData.ksa_section?.aligns_with?.[currentLang] || 'Aligned with'}</span>
            <p>{ksaData.ksa_section?.vision_2030?.[currentLang] || 'Saudi Vision 2030'}</p>
          </div>
        </div>
        <div className="bottom-right">
          {(ksaData.ksa_section?.items || []).map((item, index) => (
            <div 
              key={item.id || index} 
              className={`item-ksa ${selectedItem?.id === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <div className="number">{index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`}</div>
              <div className="text">
                <span>{item.text?.[currentLang] || 'Item'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KSA;