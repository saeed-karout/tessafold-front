import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import Header from './components/layout/Header';
import OurProcess from './pages/OurProcessPage';
import Contact from './pages/ContactPage';
import Footer from './components/layout/Footer';
import ScrollToTopButton from './components/layout/ScrollToTopButton';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <Header changeLanguage={changeLanguage} t={t} />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/our-process" element={<OurProcess />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </Router>
  );
}

export default App;