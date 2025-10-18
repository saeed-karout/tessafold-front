import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Home from './pages/Home';
import Header from './components/layout/Header';
import OurProcess from './pages/OurProcessPage';
import Contact from './pages/ContactPage';
import Footer from './components/layout/Footer';
import ScrollToTopButton from './components/layout/ScrollToTopButton';
import WhatsAppFloat from './components/layout/WhatsAppFloat';

// مكون للتمرير إلى الأعلى عند تغيير المسار
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // التمرير إلى الأعلى مع تأثير سلس
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]); // يتم التشغيل عند تغيير المسار

  return null;
}

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <ScrollToTop /> {/* إضافة مكون التمرير */}
      <Header changeLanguage={changeLanguage} t={t} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-process" element={<OurProcess />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
      <WhatsAppFloat />
    </Router>
  );
}

export default App;