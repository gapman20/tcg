import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SiteProvider, useSite } from './context/SiteContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from './context/UserContext';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Lazy Loaded Pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Products = React.lazy(() => import('./pages/Products'));
const ServiceDetail1 = React.lazy(() => import('./pages/ServiceDetail1'));
const ServiceDetail2 = React.lazy(() => import('./pages/ServiceDetail2'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Admin = React.lazy(() => import('./pages/Admin'));
const CustomPage = React.lazy(() => import('./pages/CustomPage'));
const Login = React.lazy(() => import('./pages/Login'));

// Store Pages
const Catalog = React.lazy(() => import('./pages/Catalog'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const OrderTracking = React.lazy(() => import('./pages/OrderTracking'));
const OrderConfirmation = React.lazy(() => import('./pages/OrderConfirmation'));
const Wishlist = React.lazy(() => import('./pages/Wishlist'));
const UserLogin = React.lazy(() => import('./pages/UserLogin'));

const AppContent = () => {
  const { pages, isAuthenticated } = useSite();
  const componentMap = {
    home: <Home />,
    about: <About />,
    services: <Services />,
    products: <Products />,
    portfolio: <Portfolio />,
    blog: <Blog />,
    sellados: <Products />,
    cards: <Catalog />,
    orders: <OrderTracking />,
    contact: <Contact />
  };

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <main>
        <React.Suspense fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text-secondary)' }}>
            <div className="spinner">Cargando...</div>
          </div>
        }>
          <Routes>
            {/* Static Routes */}
            <Route path="/servicios/1" element={<ServiceDetail1 />} />
            <Route path="/servicios/2" element={<ServiceDetail2 />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/admin" element={isAuthenticated ? <Admin /> : <Login />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pedido/:orderId/confirmacion" element={<OrderConfirmation />} />
            <Route path="/catalogo/:game" element={<Catalog />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/mis-deseos" element={<Wishlist />} />
            <Route path="/mis-pedidos/:orderId" element={<OrderTracking />} />
            <Route path="/identificarse" element={<UserLogin />} />
            
            {/* Dynamic Pages from SiteContext */}
            {pages.filter(p => p.active).map(page => (
              <Route 
                key={page.id} 
                path={page.path} 
                element={page.isCustom ? <CustomPage page={page} /> : componentMap[page.id]} 
              />
            ))}
          </Routes>
        </React.Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem('tcg_sellados')) {
      localStorage.setItem('tcg_sellados', JSON.stringify([
        { id: 's1', name: 'Charizard ex Ultra Premium Collection', price: 2990, priceDisplay: '$2,990', game: 'pokemon', set: 'Phantasmal Flames', type: 'premium', badge: 'Nuevo', discountPercent: 0, image: null, stock: 5 },
        { id: 's2', name: 'Mega Evolution Elite Trainer Box', price: 1270, priceDisplay: '$1,270', game: 'pokemon', set: 'Mega Evolution', type: 'elite-trainer', badge: 'Oferta', discountPercent: 20, image: null, stock: 3 },
        { id: 's3', name: 'Prismatic Evolutions Booster Box', price: 5800, priceDisplay: '$5,800', game: 'pokemon', set: 'Scarlet & Violet', type: 'booster-box', badge: 'Preventa', discountPercent: 0, image: null, stock: 10 },
        { id: 's4', name: 'Marvel Super Heroes Commander Deck', price: 890, priceDisplay: '$890', game: 'magic', set: 'Marvel', type: 'deck', badge: 'Nuevo', discountPercent: 0, image: null, stock: 8 },
        { id: 's5', name: 'Destined Rivals Booster Bundle', price: 760, priceDisplay: '$760', game: 'pokemon', set: 'Scarlet & Violet', type: 'bundle', discountPercent: 20, image: null, stock: 12 },
        { id: 's6', name: 'Digimon BT-15 Booster Box', price: 2200, priceDisplay: '$2,200', game: 'digimon', set: 'BT-15', type: 'booster-box', badge: 'Nuevo', discountPercent: 0, image: null, stock: 4 },
        { id: 's7', name: 'Dragon Ball Super Starter Deck', price: 450, priceDisplay: '$450', game: 'dragonball', set: 'Series 1', type: 'starter', discountPercent: 0, image: null, stock: 6 },
        { id: 's8', name: 'One Piece OP-10 Booster Box', price: 1800, priceDisplay: '$1,800', game: 'onepiece', set: 'Royal Blood', type: 'booster-box', badge: 'Preventa', discountPercent: 0, image: null, stock: 7 },
        { id: 's9', name: 'Surging Sparks Booster Box', price: 3360, priceDisplay: '$3,360', game: 'pokemon', set: 'Scarlet & Violet', type: 'booster-box', discountPercent: 15, image: null, stock: 5 },
        { id: 's10', name: 'Yu-Gi-Oh! Structure Deck', price: 380, priceDisplay: '$380', game: 'yugioh', set: 'Structure Deck', type: 'deck', discountPercent: 0, image: null, stock: 12 },
        { id: 's11', name: 'Phantasmal Flames 3-Pack Blister', price: 64, priceDisplay: '$64', game: 'pokemon', set: 'Mega Evolution', type: 'blister', discountPercent: 20, image: null, stock: 25 },
        { id: 's12', name: 'Lorcana Booster Box', price: 2400, priceDisplay: '$2,400', game: 'magic', set: 'Disney Lorcana', type: 'booster-box', badge: 'Nuevo', discountPercent: 0, image: null, stock: 3 }
      ]));
    }
    if (!localStorage.getItem('tcg_cards')) {
      localStorage.setItem('tcg_cards', JSON.stringify([
        { id: 'c1', name: 'Charizard ex - Ultra Rare', price: 3500, priceDisplay: '$3,500', game: 'pokemon', rarity: 'ultra-rare', set: 'Phantasmal Flames', condition: 'NM', image: null, stock: 2 },
        { id: 'c2', name: 'Mewtwo ex - Rare Holo', price: 890, priceDisplay: '$890', game: 'pokemon', rarity: 'rare-holo', set: 'Obsidian Flames', condition: 'NM', image: null, stock: 5 },
        { id: 'c3', name: 'Pikachu - Common', price: 25, priceDisplay: '$25', game: 'pokemon', rarity: 'common', set: 'Paldean Fates', condition: 'NM', image: null, stock: 20 },
        { id: 'c4', name: 'Blue Eyes White Dragon - Ultra Rare', price: 4500, priceDisplay: '$4,500', game: 'yugioh', rarity: 'ultra-rare', set: 'Structure Deck', condition: 'NM', image: null, stock: 1 },
        { id: 'c5', name: 'Dark Magician - Rare', price: 1200, priceDisplay: '$1,200', game: 'yugioh', rarity: 'rare', set: 'Structure Deck', condition: 'NM', image: null, stock: 3 },
        { id: 'c6', name: 'Black Lotus - Rare', price: 15000, priceDisplay: '$15,000', game: 'magic', rarity: 'rare', set: 'Alpha Edition', condition: 'LP', image: null, stock: 1 }
      ]));
    }
  }, []);

  return (
    <SiteProvider>
      <WishlistProvider>
        <UserProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </UserProvider>
      </WishlistProvider>
    </SiteProvider>
  );
};

export default App;
