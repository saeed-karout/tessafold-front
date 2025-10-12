import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/WhatsAppFloat.css';
import whatsappData from '../../data/whatsapp.json';

function WhatsAppFloat() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [showNotification, setShowNotification] = useState(false); // التحكم في ظهور الإشعار

  const { whatsapp } = whatsappData;
  const phoneNumber = whatsapp.phoneNumber;
  const settings = whatsapp.settings;

  useEffect(() => {
    // تأخير ظهور الزر لتحسين تجربة المستخدم
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, settings.delay || 2000);

    // إظهار الإشعار لمدة 5 ثوانٍ ثم إخفاؤه
    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
    }, 4000);

    const hideNotificationTimer = setTimeout(() => {
      setShowNotification(false);
    }, 9000);

    // إيقاف النبض بعد 15 ثانية
    const pulseTimer = setTimeout(() => {
      setShowPulse(false);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearTimeout(notificationTimer);
      clearTimeout(hideNotificationTimer);
      clearTimeout(pulseTimer);
    };
  }, [settings.delay]);

  const handleWhatsAppClick = () => {
    const message = whatsapp.messages.default[currentLang] || 
                   t('whatsapp.defaultMessage', { defaultValue: 'Hello! I would like to get more information.' });
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    if (settings.autoOpen) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      // بديل للشاشات التي قد تحجب النافذة المنبثقة
      window.location.href = whatsappUrl;
    }

    // إخفاء الإشعار بعد النقر
    setShowNotification(false);
    setShowPulse(false);
  };

  const getTooltipText = () => {
    if (isHovered) {
      return whatsapp.tooltips.clickToChat[currentLang] || 
             t('whatsapp.clickToChat', { defaultValue: 'Click to start chatting' });
    }
    return whatsapp.tooltips.contact[currentLang] || 
           t('whatsapp.contactUs', { defaultValue: 'Contact us on WhatsApp' });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`whatsapp-float-container ${settings.position || 'bottom-right'}`}>
      {/* Tooltip */}
      <div className={`whatsapp-tooltip ${isHovered ? 'visible' : ''}`}>
        {getTooltipText()}
      </div>
      
      {/* زر واتساب الرئيسي */}
      <div 
        className="whatsapp-float"
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label={whatsapp.tooltips.contact[currentLang] || "Contact us on WhatsApp"}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleWhatsAppClick();
          }
        }}
      >
        <svg 
          className="whatsapp-icon" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.424"/>
        </svg>
        
        {/* الأنيميشن النابض */}
        {settings.showPulse && showPulse && (
          <div className="whatsapp-pulse" aria-hidden="true"></div>
        )}
        
        {/* مؤشر النقر للجوال */}
        <div className="whatsapp-tap-indicator" aria-hidden="true"></div>
      </div>

      {/* عدد الرسائل غير المقروءة - تظهر مؤقتاً */}
      {showNotification && (
        <div className="whatsapp-notification" aria-hidden="true">
          <span>1</span>
        </div>
      )}
    </div>
  );
}

export default WhatsAppFloat;