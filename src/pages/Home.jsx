import { useTranslation } from 'react-i18next';
import Projects from '../components/Home/Projects';
import KSA from '../components/Home/ksa';
import About from '../components/Home/About';
import OurProcess from '../components/Home/OurProcess';
import OurServices from '../components/Home/OurServices';
import WeServe from '../components/Home/WeServe';
import FAQ from '../components/Home/FAQ';
import ComponentPackage from '../components/Home/packageComponent';
import HeroSection from '../components/Home/HeroSection';
import Certificates from '../components/Home/Certificates';
import LastSection from '../components/LastSection';
import Reviews from '../components/Home/Reviews';

function Home() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.split('-')[0] || 'en';

  return (
    <main>
      <section><HeroSection /></section>
      <section id="projects"><Projects /></section>
      <section id="about"><About /></section>
      <section id="reviews"><Reviews /></section>
      <section id="our_process"><OurProcess /></section>
      <section id="services"><OurServices /></section>
      <section><ComponentPackage /></section>
      <section id="we_serve"><WeServe /></section>
      {currentLang !== 'de' && <section id="ksa"><KSA /></section>}
      <section id=""><Certificates /></section>
      <section id="faq"><FAQ /></section>
      <section><LastSection /></section>
    </main>
  );
}

export default Home;