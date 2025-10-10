import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import packageTranslations from '../../data/packageComponent.json';
import "../../styles/main-package.css";

function PackageComponent() {
  const {  i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  return (
    <div className='tech-package-main' style={{ direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
        <div className="tech-package-content">
          <div className="tech-content-center">
            <div className="tech-top-section">
              <div className="tech-main-title">
                {packageTranslations.package.title_part1[currentLang]} 
                <span className="tech-highlight">
                  {" "}{packageTranslations.package.title_part2[currentLang]}
                </span>
              </div>

              <div className="tech-subtitle">
                {packageTranslations.package.subtitle[currentLang]}
              </div>
            </div>

            <Link to={'/contact'}>
              <div className="tech-contact-btn">
                <span className="tech-btn-text">
                  {packageTranslations.package.button[currentLang]}
                </span>
              </div>
            </Link>
          </div>

          {/* العناصر مع الأنيميشن */}
          <div className="tech-icon-frame tech-pos-1 tech-float-anim">
              <img src="/icons/lang-code/azure.png" alt="Azure" />
          </div>

          <div className="tech-icon-frame tech-pos-2 tech-float-anim tech-delay-1">
              <img src="/icons/lang-code/python.svg" alt="Python" />
          </div>

          <div className="tech-icon-frame tech-pos-3 tech-float-anim tech-delay-2">
              <img src="/icons/lang-code/js.svg" alt="JavaScript" />
          </div>

          <div className="tech-icon-frame tech-pos-4 tech-float-anim tech-delay-3">
              <img src="/icons/lang-code/stripe.png" alt="Stripe" />
          </div>

          <div className="tech-icon-frame tech-pos-5 tech-float-anim tech-delay-4">
              <img src="/icons/lang-code/react.svg" alt="React" />
          </div>

          <div className="tech-icon-frame tech-pos-6 tech-float-anim tech-delay-5">
              <img src="/icons/lang-code/java.svg" alt="Java" />
          </div>

          <div className="tech-icon-frame tech-pos-7 tech-float-anim tech-delay-6">
              <img src="/icons/lang-code/figma.svg" alt="Figma" />
          </div>

          <div className="tech-icon-frame tech-pos-8 tech-float-anim tech-delay-7">
              <img src="/icons/lang-code/AWS.png" alt="AWS" />
          </div>

          <div className="tech-icon-frame tech-pos-9 tech-float-anim tech-delay-8">
              <img src="/icons/lang-code/node.png" alt="Node.js" />
          </div>

          <div className="tech-icon-frame tech-pos-10 tech-float-anim tech-delay-9">
              <img src="/icons/lang-code/flutter.png" alt="Flutter" />
          </div>
        </div>
    </div>
  )
}

export default PackageComponent;