import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import useAutoLanguage from './hooks/useAutoLanguage';
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
  useAutoLanguage(); // تفعيل اكتشاف اللغة تلقائيًا

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    document.body.setAttribute('data-lang', lng);
  };

  return (
    <Router>
      <ScrollToTop />
      <Header changeLanguage={changeLanguage} t={t} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<Home />} /> 
        <Route path="/software-development-staff-augmentation" element={<Home />} /> 
        <Route path="/web3-blockchain" element={<Home />} />
        <Route path="/our-process" element={<OurProcess />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/ar/contact-us" element={<Contact />} />

      </Routes>
      <Footer />
      <ScrollToTopButton />
      <WhatsAppFloat />
    </Router>
  );
}

export default App;