import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Default Text Content ─────────────────────────────────────────────────────
const defaultContent = {
  siteName:  'MiEmpresa',
  tagline:   'Soluciones web profesionales y administrables.',
  ctaButton: 'Contáctanos',

  // SEO
  seo: {
    title:       'MiEmpresa | Soluciones Web Profesionales',
    description: 'Diseñamos sitios web de alto rendimiento, totalmente autogestionables, con diseño premium y enfoque en resultados.',
    keywords:    'diseño web, marketing digital, apps móviles, sitio web profesional',
  },

  // Social
  social: {
    instagram: 'https://instagram.com/',
    youtube:   'https://youtube.com/',
    facebook:  'https://facebook.com/',
    tiktok:    '',
    linkedin:  '',
  },

  // WhatsApp
  whatsappFloat: {
    number:  '+521234567890',   // E.164 format, no spaces
    message: 'Hola! Vi su página web y me gustaría solicitar más información.',
  },

  // Home Page
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

  // Nosotros
  about: {
    title:      'Nosotros',
    subtitle:   'Conoce al equipo detrás de las mejores experiencias digitales.',
    misionTitle:'Nuestra Misión',
    misionText: 'Empoderar a empresas de todos los tamaños mediante el desarrollo de plataformas digitales robustas, escalables y visualmente impactantes.',
    visionTitle:'Nuestra Visión',
    visionText: 'Ser la agencia de desarrollo web líder a nivel nacional, reconocida por nuestra excelencia en diseño (UI/UX) y soluciones autogestionables.',
  },

  // Servicios (editable cards)
  services: {
    title:    'Servicios Premium',
    subtitle: 'Desarrollamos armas digitales. Tecnologías enfocadas en crecimiento exponencial.',
    cards: [
      { id: '1', title: 'Diseño Web Ultrasónico', desc: 'Interfaces de usuario vibrantes y animadas. Arquitectura frontend de última generación.', active: true },
      { id: '2', title: 'Marketing de Dominación', desc: 'Estrategias SEM y SEO agresivas utilizando IA para posicionar tu marca en todos los frentes.', active: true },
      { id: '3', title: 'Aplicaciones Móviles', desc: 'Desarrollo nativo o híbrido que se siente fluido, pensado para la retención del usuario.', active: true },
      { id: '4', title: 'Sistemas a Medida', desc: 'CRMs y automatización de procesos complejos bajo arquitecturas robustas.', active: true },
    ],
  },

  // Contacto
  contact: {
    title:    'Comienza Ahora',
    subtitle: 'El momento de escalar tus operaciones es hoy.',
    whatsapp: '+52 (123) 456-7890',
    email:    'hola@agenciadigital.com',
    address:  'Av. Reforma 222, CDMX.',
    mapLat:   19.4326,
    mapLng:   -99.1332,
  },

  // Footer
  footer: {
    description: 'Soluciones web profesionales y autogestionables. Diseño premium, entrega rápida y resultados medibles.',
    copyright:   'MiEmpresa. Todos los derechos reservados.',
  },
};

// ─── Default Theme (CSS variables) ───────────────────────────────────────────
const defaultTheme = {
  accentPrimary:   '#3b82f6',
  accentSecondary: '#8b5cf6',
  bgPrimary:       '#050505',
  bgSecondary:     '#0a0a0d',
  bgTertiary:      '#111116',
  textPrimary:     '#ffffff',
  textSecondary:   '#a1a1aa',
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

  const [saveStatus, setSaveStatus] = useState(null);

  // Apply theme on every change (live preview!)
  useEffect(() => { applyTheme(theme); }, [theme]);

  // ── Text helpers ──────────────────────────────────────────────────────────
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

  // ── Service card helpers ──────────────────────────────────────────────────
  const updateServiceCard = (index, field, value) => {
    setContent(prev => {
      const next = deepMerge({}, prev);
      next.services.cards[index][field] = value;
      return next;
    });
  };

  // ── Theme helpers ─────────────────────────────────────────────────────────
  const updateTheme = (key, value) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

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
      setSaveStatus('saved');
    } catch {
      setSaveStatus('error');
    } finally {
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const resetContent = () => {
    localStorage.removeItem(CONTENT_KEY);
    localStorage.removeItem(IMAGES_KEY);
    localStorage.removeItem(THEME_KEY);
    setContent(defaultContent);
    setImages(defaultImages);
    setTheme(defaultTheme);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <SiteContext.Provider value={{
      content, updateContent, updateServiceCard,
      images,  updateImage, removeImage,
      theme,   updateTheme, resetTheme,
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
