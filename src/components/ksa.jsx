import { useTranslation } from 'react-i18next';
import ksaData from '../data/ksa.json';
import "../styles/ksa.css"

function Partners() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <section className='ksa-main' style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div className="ksa-left">
        <div className="bg-ksa" >
          <div className="text-ksa">
            <span>{ksaData.ksa_section.left_text[currentLang]}</span>
          </div>
        </div>
      </div>

      <div className="ksa-right">
        <div className="top-right">
          <img src="/images/ksa/ksa.webp" className='icon-ksa' alt="Saudi Vision 2030" />
          <div className="subtitle-ksa">
            {ksaData.ksa_section.title[currentLang]}  
            <span>{ksaData.ksa_section.aligns_with[currentLang]}</span>
            <p>{ksaData.ksa_section.vision_2030[currentLang]}</p>
          </div>
        </div>

        <div className="bottom-right">
          {ksaData.ksa_section.items.map((item, index) => (
            <div key={item.id} className="item-ksa">
              <div className="number">{index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`}</div>
              <div className="text">
                <span>{item.text[currentLang]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;