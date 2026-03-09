import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Default Text Content ─────────────────────────────────────────────────────
const defaultContent = {
  siteName:  'MiEmpresa',
  tagline:   'Soluciones web profesionales y administrables.',
  ctaButton: 'Contáctanos',

  seo: {
    title:       'MiEmpresa | Soluciones Web Profesionales',
    description: 'Diseñamos sitios web de alto rendimiento, totalmente autogestionables, con diseño premium y enfoque en resultados.',
    keywords:    'diseño web, marketing digital, apps móviles, sitio web profesional',
  },

  social: {
    instagram: 'https://instagram.com/',
    youtube:   'https://youtube.com/',
    facebook:  'https://facebook.com/',
    tiktok:    '',
    linkedin:  '',
  },

  whatsappFloat: {
    number:  '+521234567890',
    message: 'Hola! Vi su página web y me gustaría solicitar más información.',
  },

  home: {
    badge:              'NUEVA VERSIÓN 2024 DISPONIBLE',
    title:              'Eleva tu Empresa al',
    titleAccent:        'Siguiente Nivel Digital',
    subtitle:           'Diseñamos experiencias web de alto rendimiento. Estética premium, arquitectura escalable y un panel de control completamente autogestionable pensado para maximizar tus ventas.',
    ctaText:            'Cotiza tu Proyecto',
    ctaSecondary:       'Ver Casos de Éxito',
    featuresTitle:      'Tecnología de Vanguardia',
    featuresSubtitle:   'No hacemos páginas comunes. Construimos ecosistemas digitales listos para competir y ganar en tu industria.',
    ctaSectionTitle:    '¿Listo para el cambio?',
    ctaSectionSubtitle: 'Únete a las empresas que ya están facturando más gracias a un ecosistema digital profesional.',
  },

  about: {
    title:      'Nosotros',
    subtitle:   'Conoce al equipo detrás de las mejores experiencias digitales.',
    misionTitle:'Nuestra Misión',
    misionText: 'Empoderar a empresas de todos los tamaños mediante el desarrollo de plataformas digitales robustas, escalables y visualmente impactantes.',
    visionTitle:'Nuestra Visión',
    visionText: 'Ser la agencia de desarrollo web líder a nivel nacional, reconocida por nuestra excelencia en diseño (UI/UX) y soluciones autogestionables.',
  },

  services: {
    title:    'Servicios Premium',
    subtitle: 'Desarrollamos armas digitales. Tecnologías enfocadas en crecimiento exponencial.',
    cards: [
      { id: '1', title: 'Diseño Web Ultrasónico',  desc: 'Interfaces de usuario vibrantes y animadas. Arquitectura frontend de última generación.', active: true },
      { id: '2', title: 'Marketing de Dominación', desc: 'Estrategias SEM y SEO agresivas utilizando IA para posicionar tu marca en todos los frentes.', active: true },
      { id: '3', title: 'Aplicaciones Móviles',    desc: 'Desarrollo nativo o híbrido que se siente fluido, pensado para la retención del usuario.', active: true },
      { id: '4', title: 'Sistemas a Medida',       desc: 'CRMs y automatización de procesos complejos bajo arquitecturas robustas.', active: true },
    ],
  },

  contact: {
    title:    'Comienza Ahora',
    subtitle: 'El momento de escalar tus operaciones es hoy.',
    whatsapp: '+52 (123) 456-7890',
    email:    'hola@agenciadigital.com',
    address:  'Av. Reforma 222, CDMX.',
    mapLat:   19.4326,
    mapLng:   -99.1332,
  },

  footer: {
    description: 'Soluciones web profesionales y autogestionables. Diseño premium, entrega rápida y resultados medibles.',
    copyright:   'MiEmpresa. Todos los derechos reservados.',
  },
};

// ─── Default Blog Posts ────────────────────────────────────────────────────────
const defaultBlogPosts = [
  {
    id: 'post-1',
    title:     'Tendencias de Diseño Web para 2024',
    excerpt:   'Descubre los estilos visuales y arquitecturas tecnológicas que dominarán la industria digital este año.',
    content:   'A medida que entramos en un nuevo año, el panorama del diseño web continúa evolucionando rápidamente. Las interfaces oscuras (Dark Mode), el minimalismo funcional y las micro-interacciones suaves ya no son opcionales, sino expectativas estándar de los usuarios premium.\n\nEn este artículo exploraremos cómo la Tipografía Fluida y los Diseños Glassmórficos están dominando el espacio tecnológico, proporcionando experiencias de usuario (UX) inmersivas que retienen por más tiempo a los clientes potenciales.\n\nEl glassmorfismo avanzado utiliza fondos semi-transparentes con desenfoque de fondo, creando una jerarquía visual impresionante especialmente cuando se superpone en fondos fotográficos profundos.',
    author:    'Admin',
    date:      'Oct 12, 2023',
    image:     null,
    tags:      'diseño web, tendencias, UI/UX',
    published: true,
  },
  {
    id: 'post-2',
    title:     'Cómo optimizar tu SEO Local',
    excerpt:   'Estrategias probadas para hacer que tu negocio aparezca primero en las búsquedas de Google Maps de tu ciudad.',
    content:   'El SEO local es fundamental para cualquier negocio que atienda a clientes en una zona geográfica específica. Aparecer en los primeros resultados de Google Maps puede marcar la diferencia entre tener o no tener clientes.\n\nEn esta guía aprenderás a optimizar tu perfil de Google Business, cómo conseguir reseñas auténticas de clientes, y las palabras clave locales que debes incluir en tu sitio web para dominar tu mercado local.',
    author:    'Equipo Marketing',
    date:      'Oct 05, 2023',
    image:     null,
    tags:      'SEO, marketing local, Google',
    published: true,
  },
  {
    id: 'post-3',
    title:     'La importancia de un panel autogestionable',
    excerpt:   'Por qué depender de un programador para cada cambio de texto es algo del pasado y cómo un CMS ahorra costos.',
    content:   'En el mundo empresarial moderno, la agilidad es clave. Tener que esperar días o semanas para que un programador actualice el texto de tu landing page es una desventaja competitiva seria.\n\nLos paneles de administración modernos permiten a cualquier persona del equipo actualizar contenido, imágenes, precios y más, sin tocar una sola línea de código. Esto reduce costos, aumenta la velocidad de respuesta al mercado y empodera a tu equipo.',
    author:    'Admin',
    date:      'Sep 28, 2023',
    image:     null,
    tags:      'CMS, administración, negocios',
    published: true,
  },
];

// ─── Default Pages ─────────────────────────────────────────────────────────────
const defaultPages = [
  { id: 'home', name: 'Inicio', path: '/', active: true, isCustom: false },
  { id: 'about', name: 'Nosotros', path: '/nosotros', active: true, isCustom: false },
  { id: 'services', name: 'Servicios', path: '/servicios', active: true, isCustom: false },
  { id: 'products', name: 'Productos', path: '/productos', active: true, isCustom: false },
  { id: 'portfolio', name: 'Portafolio', path: '/portafolio', active: true, isCustom: false },
  { id: 'blog', name: 'Blog', path: '/blog', active: true, isCustom: false },
];

// ─── Default Products ────────────────────────────────────────────────────────
const defaultProducts = [
  { id: 'prod-1', name: 'Foco LED 12W', description: 'Foco LED luz fría, alto rendimiento y bajo consumo. Ideal para interiores y exteriores techados.', price: '$45.00', image: null, active: true },
  { id: 'prod-2', name: 'Cable Calibre 12 THW', description: 'Rollo de cable de cobre de 100m. Resistente al calor y humedad. Colores disponibles: rojo, negro, verde y blanco.', price: '$1,250.00', image: null, active: true },
  { id: 'prod-3', name: 'Centro de Carga 2 Polos', description: 'Centro de carga QO para montaje de sobreponer, incluye zapatas principales.', price: '$220.00', image: null, active: true },
  { id: 'prod-4', name: 'Contacto Duplex con Placa', description: 'Contacto polarizado en color blanco, diseño moderno y fácil instalación.', price: '$35.00', image: null, active: true },
];

// ─── Default Theme ────────────────────────────────────────────────────────────
const defaultTheme = {
  accentPrimary:   '#3b82f6',
  accentSecondary: '#8b5cf6',
  bgPrimary:       '#050505',
  bgSecondary:     '#0a0a0d',
  bgTertiary:      '#111116',
  textPrimary:     '#ffffff',
  textSecondary:   '#a1a1aa',
  // Explicit per-element controls
  navbarColor:     '#0a0a0d',   // navbar background
  cardBg:          '#0f0f14',   // glass cards background
  textNavbarPrimary:   '#ffffff',
  textNavbarSecondary: '#a1a1aa',
  textCardPrimary:     '#ffffff',
  textCardSecondary:   '#a1a1aa',
};

// ─── Default Images ────────────────────────────────────────────────────────────
const defaultImages = {
  logo:      null,
  heroBg:    null,
  aboutHero: null,
  portfolio: [null, null, null, null, null, null],
};

// ─── Storage Keys ──────────────────────────────────────────────────────────────
const CONTENT_KEY = 'site_content_v1';
const IMAGES_KEY  = 'site_images_v1';
const THEME_KEY   = 'site_theme_v1';
const BLOG_KEY    = 'site_blog_v1';
const PAGES_KEY   = 'site_pages_v1';
const PRODS_KEY   = 'site_products_v1';
const ANALYTICS_KEY = 'site_analytics_v1';
const AUTH_KEY    = 'site_auth_v1';
const PASS_KEY    = 'site_pass_v1';
const INBOX_KEY   = 'site_inbox_v1';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function moveArrayItem(arr, index, direction) {
  const newArr = [...arr];
  if (direction === 'up' && index > 0) {
    [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
  } else if (direction === 'down' && index < newArr.length - 1) {
    [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
  }
  return newArr;
}

// Applies ALL theme variables to CSS custom properties — controls navbar, cards, etc.
function applyTheme(theme) {
  const root = document.documentElement;

  root.style.setProperty('--accent-primary',   theme.accentPrimary);
  root.style.setProperty('--accent-secondary',  theme.accentSecondary);
  root.style.setProperty('--accent-gradient',   `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentSecondary})`);
  root.style.setProperty('--accent-glow',       `${theme.accentPrimary}66`);
  root.style.setProperty('--bg-primary',        theme.bgPrimary);
  root.style.setProperty('--bg-secondary',      theme.bgSecondary);
  root.style.setProperty('--bg-tertiary',       theme.bgTertiary);
  root.style.setProperty('--text-primary',      theme.textPrimary);
  root.style.setProperty('--text-secondary',    theme.textSecondary);

  // Module-specific text colors
  root.style.setProperty('--text-navbar-primary',   theme.textNavbarPrimary || theme.textPrimary);
  root.style.setProperty('--text-navbar-secondary', theme.textNavbarSecondary || theme.textSecondary);
  root.style.setProperty('--text-card-primary',     theme.textCardPrimary || theme.textPrimary);
  root.style.setProperty('--text-card-secondary',   theme.textCardSecondary || theme.textSecondary);

  // Navbar — uses navbarColor with 90% opacity for the glassmorphism effect
  const navColor = theme.navbarColor || theme.bgSecondary;
  root.style.setProperty('--nav-bg',      navColor + 'e6');  // 90% opacity
  root.style.setProperty('--nav-menu-bg', navColor + 'fa');  // 98% opacity (mobile menu)

  // Cards / glass elements — uses cardBg directly
  const card = theme.cardBg || theme.bgSecondary;
  root.style.setProperty('--glass-bg', card);

  // Border: automatically adapts to dark/light
  const isLight = theme.bgPrimary > '#888888';
  root.style.setProperty('--glass-border',
    isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.09)');
}

// ─── Context ──────────────────────────────────────────────────────────────────
const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(CONTENT_KEY);
      if (saved) return deepMerge(defaultContent, JSON.parse(saved));
    } catch { /* ignore */ }
    return defaultContent;
  });

  const [images, setImages] = useState(() => {
    try {
      const saved = localStorage.getItem(IMAGES_KEY);
      if (saved) return { ...defaultImages, ...JSON.parse(saved) };
    } catch { /* ignore */ }
    return defaultImages;
  });

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return { ...defaultTheme, ...JSON.parse(saved) };
    } catch { /* ignore */ }
    return defaultTheme;
  });

  const [blogPosts, setBlogPosts] = useState(() => {
    try {
      const saved = localStorage.getItem(BLOG_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return defaultBlogPosts;
  });

  const [pages, setPages] = useState(() => {
    try {
      const saved = localStorage.getItem(PAGES_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return defaultPages;
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODS_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return defaultProducts;
  });

  const [analytics, setAnalytics] = useState(() => {
    try {
      const saved = localStorage.getItem(ANALYTICS_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return {
      whatsapp_clicks: 0,
      visits_simulated: [120, 150, 200, 180, 250, 310, 290] // Simulamos 7 días
    };
  });

  const [inbox, setInbox] = useState(() => {
    try {
      const saved = localStorage.getItem(INBOX_KEY);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return [];
  });

  const [password, setPassword] = useState(() => localStorage.getItem(PASS_KEY) || 'admin123');
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(AUTH_KEY) === 'true');
  const [saveStatus, setSaveStatus] = useState(null);

  // Apply every theme change live (real-time preview)
  useEffect(() => { applyTheme(theme); }, [theme]);

  // ── Content helpers ───────────────────────────────────────────────────────
  const updateContent = (path, value) => {
    setContent(prev => {
      const next = deepMerge({}, prev);
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const updateServiceCard = (index, field, value) => {
    setContent(prev => {
      const next = deepMerge({}, prev);
      next.services.cards[index][field] = value;
      return next;
    });
  };

  const moveServiceCard = (index, direction) => {
    setContent(prev => {
      const next = deepMerge({}, prev);
      next.services.cards = moveArrayItem(next.services.cards, index, direction);
      return next;
    });
  };

  // ── Blog helpers ──────────────────────────────────────────────────────────
  const createBlogPost = () => {
    const newPost = {
      id:        `post-${Date.now()}`,
      title:     'Nuevo Artículo',
      excerpt:   'Escribe aquí un resumen del artículo...',
      content:   'Escribe el contenido completo del artículo aquí...',
      author:    'Admin',
      date:      new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' }),
      image:     null,
      tags:      '',
      published: false,
    };
    setBlogPosts(prev => [newPost, ...prev]);
    return newPost.id;
  };

  const updateBlogPost = (id, field, value) => {
    setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deleteBlogPost = (id) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  const duplicateBlogPost = (id) => {
    setBlogPosts(prev => {
      const original = prev.find(p => p.id === id);
      if (!original) return prev;
      const copy = { ...original, id: `post-${Date.now()}`, title: `${original.title} (copia)`, published: false };
      return [copy, ...prev];
    });
  };

  // ── Pages helpers ─────────────────────────────────────────────────────────
  const createPage = () => {
    const newPage = {
      id:          `page-${Date.now()}`,
      name:        'Nueva Página',
      path:        `/nueva-pagina-${Date.now().toString().slice(-4)}`,
      active:      false,
      isCustom:    true,
      pageTitle:   'Título de tu nueva página',
      pageSubtitle:'Describe brevemente de qué trata esta página.',
      pageText:    'Escribe aquí todo lo que quieras contar. Puedes presionar "Enter" para crear nuevos párrafos.',
      pageImage:   null
    };
    setPages(prev => [...prev, newPage]);
    return newPage.id;
  };

  const updatePage = (id, field, value) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deletePage = (id) => {
    setPages(prev => prev.filter(p => p.id !== id));
  };

  const movePage = (index, direction) => {
    setPages(prev => moveArrayItem(prev, index, direction));
  };

  // ── Products helpers ──────────────────────────────────────────────────────
  const createProduct = () => {
    const newProduct = {
      id:          `prod-${Date.now()}`,
      name:        'Nuevo Producto',
      description: 'Descripción breve del producto.',
      price:       '$0.00',
      image:       null,
      active:      true
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct.id;
  };

  const updateProduct = (id, field, value) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const moveProduct = (index, direction) => {
    setProducts(prev => moveArrayItem(prev, index, direction));
  };

  // ── Analytics helpers ───────────────────────────────────────────────────
  const trackAnalytics = (event) => {
    setAnalytics(prev => {
      const next = { ...prev };
      if (event === 'whatsapp') next.whatsapp_clicks = (next.whatsapp_clicks || 0) + 1;
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(next));
      return next;
    });
  };

  // ── Auth helpers ────────────────────────────────────────────────────────
  const login = (pass) => {
    if (pass === password) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  };
  const changePassword = (oldPass, newPass) => {
    if (oldPass === password) {
      setPassword(newPass);
      localStorage.setItem(PASS_KEY, newPass);
      return true;
    }
    return false;
  };

  // ── Inbox helpers ───────────────────────────────────────────────────────
  const addMessage = (msg) => {
    const newMsg = { ...msg, id: Date.now(), date: new Date().toISOString(), read: false };
    setInbox(prev => {
      const updated = [newMsg, ...prev];
      localStorage.setItem(INBOX_KEY, JSON.stringify(updated));
      return updated;
    });
  };
  const markMessageRead = (id) => {
    setInbox(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, read: true } : m);
      localStorage.setItem(INBOX_KEY, JSON.stringify(updated));
      return updated;
    });
  };
  const deleteMessage = (id) => {
    setInbox(prev => {
      const updated = prev.filter(m => m.id !== id);
      localStorage.setItem(INBOX_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // ── Theme helpers ─────────────────────────────────────────────────────────
  const updateTheme = (key, value) => setTheme(prev => ({ ...prev, [key]: value }));
  const resetTheme  = () => setTheme(defaultTheme);

  // ── Image helpers ─────────────────────────────────────────────────────────
  const updateImage = (key, base64, index = null) => {
    setImages(prev => {
      if (index !== null) {
        const arr = [...(prev[key] || [])];
        arr[index] = base64;
        return { ...prev, [key]: arr };
      }
      return { ...prev, [key]: base64 };
    });
  };
  const removeImage = (key, index = null) => updateImage(key, null, index);

  // ── Persist ───────────────────────────────────────────────────────────────
  const saveContent = () => {
    try {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
      localStorage.setItem(IMAGES_KEY,  JSON.stringify(images));
      localStorage.setItem(THEME_KEY,   JSON.stringify(theme));
      localStorage.setItem(BLOG_KEY,    JSON.stringify(blogPosts));
      localStorage.setItem(PAGES_KEY,   JSON.stringify(pages));
      localStorage.setItem(PRODS_KEY,   JSON.stringify(products));
      localStorage.setItem(ANALYTICS_KEY,JSON.stringify(analytics));
      setSaveStatus('saved');
    } catch {
      setSaveStatus('error');
    } finally {
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const resetContent = () => {
    [CONTENT_KEY, IMAGES_KEY, THEME_KEY, BLOG_KEY, PAGES_KEY, PRODS_KEY, ANALYTICS_KEY].forEach(k => localStorage.removeItem(k));
    setContent(defaultContent);
    setImages(defaultImages);
    setTheme(defaultTheme);
    setBlogPosts(defaultBlogPosts);
    setPages(defaultPages);
    setProducts(defaultProducts);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <SiteContext.Provider value={{
      content, updateContent, updateServiceCard, moveServiceCard,
      images,  updateImage, removeImage,
      theme,   updateTheme, resetTheme,
      blogPosts, createBlogPost, updateBlogPost, deleteBlogPost, duplicateBlogPost,
      pages, createPage, updatePage, deletePage, movePage,
      products, createProduct, updateProduct, deleteProduct, moveProduct,
      analytics, trackAnalytics,
      inbox, addMessage, markMessageRead, deleteMessage,
      isAuthenticated, login, logout, changePassword,
      saveContent, resetContent, saveStatus,
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
};

export { defaultContent, defaultTheme };
