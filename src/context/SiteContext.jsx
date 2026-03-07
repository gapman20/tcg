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
      setSaveStatus('saved');
    } catch {
      setSaveStatus('error');
    } finally {
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const resetContent = () => {
    [CONTENT_KEY, IMAGES_KEY, THEME_KEY, BLOG_KEY].forEach(k => localStorage.removeItem(k));
    setContent(defaultContent);
    setImages(defaultImages);
    setTheme(defaultTheme);
    setBlogPosts(defaultBlogPosts);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <SiteContext.Provider value={{
      content, updateContent, updateServiceCard,
      images,  updateImage, removeImage,
      theme,   updateTheme, resetTheme,
      blogPosts, createBlogPost, updateBlogPost, deleteBlogPost, duplicateBlogPost,
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
