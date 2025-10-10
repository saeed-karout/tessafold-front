import Projects from '../components/Home/Projects';
import KSA from '../components/ksa';
import About from '../components/Home/About';
import OurProcess from '../components/Home/OurProcess';
import OurServices from '../components/Home/OurServices';
import WeServe from '../components/Home/WeServe';
import FAQ from '../components/FAQ';
// import Contact from '../components/Contact';
import ComponentPackage from '../components/Home/packageComponent';
import HeroSection from '../components/Home/HeroSection';
import Certificates from '../components/Home/Certificates';
import LastSection from '../components/LastSection';

function Home() {
  return (
    <main>
      <section><HeroSection /></section>
      <section id="projects"><Projects /></section>
      <section id="about"><About /></section>
      <section id="our_process"><OurProcess /></section>
      <section id="our_services"><OurServices /></section>
      <section><ComponentPackage /></section>
      <section id="we_serve"><WeServe /></section>
      <section id="ksa"><KSA /></section>
      <section><Certificates /></section>
      <section id="faq"><FAQ /></section>
      <section><LastSection /></section>
      {/* <section id="contact"><Contact /></section> */}
    </main>
  );
}

export default Home;