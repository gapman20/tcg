import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SiteProvider, useSite } from './context/SiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import ServiceDetail1 from './pages/ServiceDetail1';
import ServiceDetail2 from './pages/ServiceDetail2';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import CustomPage from './pages/CustomPage';
import Login from './pages/Login';

const AppContent = () => {
  const { pages, isAuthenticated } = useSite();
  const componentMap = {
    home: <Home />,
    about: <About />,
    services: <Services />,
    products: <Products />,
    portfolio: <Portfolio />,
    blog: <Blog />
  };

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          {pages.filter(p => p.active).map(page => (
            <Route 
              key={page.id} 
              path={page.path} 
              element={page.isCustom ? <CustomPage page={page} /> : componentMap[page.id]} 
            />
          ))}
          {/* Static Sub-routes */}
          <Route path="/servicios/1" element={<ServiceDetail1 />} />
          <Route path="/servicios/2" element={<ServiceDetail2 />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/admin" element={isAuthenticated ? <Admin /> : <Login />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const App = () => {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
};

export default App;
