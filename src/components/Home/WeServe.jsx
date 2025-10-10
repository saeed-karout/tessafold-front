import { useTranslation } from 'react-i18next';
import weServeData from '../../data/we-serve.json';
import "../../styles/weServe.css"

function WeServe() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <section className='we-serve-main' style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>

      <div className="top-serve">
        <div className="title-serve">
          {weServeData.we_serve.title_part1[currentLang]}
          <span> {weServeData.we_serve.title_part2[currentLang]}</span>
        </div>

        <div className="subtitle-serve">
          {weServeData.we_serve.subtitle[currentLang]}
        </div>
      </div>

      <div className="frame-serve">
        {weServeData.we_serve.cards.map((card, index) => (
          <div 
            key={card.id}
            className={`card-serve ${index % 2 === 0 ? 'with-bg' : 'without-bg'}`}
          >
            <img src={card.icon} alt={card.topic[currentLang]} />
            <div className="topic-serve">
              {card.topic[currentLang]}
            </div>
            <div className="description-serve">
              {card.description[currentLang]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WeServe;