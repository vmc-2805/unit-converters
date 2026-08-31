import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Seo from './components/Seo.jsx';
import Home from './pages/Home.jsx';
import ConverterPage from './pages/ConverterPage.jsx';
import GroupPage from './pages/GroupPage.jsx';
import AllConverters from './pages/AllConverters.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="app">
      <Seo />
      <ScrollToTop />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert/:categoryId" element={<ConverterPage />} />
          <Route path="/category/:groupId" element={<GroupPage />} />
          <Route path="/converters" element={<AllConverters />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
