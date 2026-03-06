import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import ImageUploader from '../components/ImageUploader';
import {
  LayoutDashboard, FileText, Settings, Mail, Info,
  Save, RotateCcw, CheckCircle, AlertCircle, Eye,
  Image as ImageIcon, Palette, BarChart2, Globe,
  MessageSquare, Zap, Users, TrendingUp, Monitor,
  ToggleLeft, ToggleRight, RefreshCw
} from 'lucide-react';

// ─── Shared input style ───────────────────────────────────────────────────────
const inputSt = {
  width: '100%', padding: '11px 14px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--glass-border)',
  borderRadius: '8px', color: 'white',
  fontFamily: 'var(--font-body)', fontSize: '0.95rem',
  outline: 'none', resize: 'vertical',
  transition: 'border-color 0.2s',
};
const focus = e => (e.target.style.borderColor = 'var(--accent-primary)');
const blur = e => (e.target.style.borderColor = 'var(--glass-border)');

const sectionTitle = {
  fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '800',
  marginBottom: '2rem', paddingBottom: '1rem',
  borderBottom: '1px solid var(--glass-border)', color: 'var(--text-primary)',
  display: 'flex', alignItems: 'center', gap: '10px',
};

// ─── Reusable components ──────────────────────────────────────────────────────
const Field = ({ label, path, value, type = 'text', onChange, hint }) => (
  <div style={{ marginBottom: '1.2rem' }}>
    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
      {label}
    </label>
    {hint && <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', opacity: 0.65, marginBottom: '0.4rem' }}>{hint}</p>}
    {type === 'textarea'
      ? <textarea value={value} rows={3} onChange={e => onChange(path, e.target.value)} style={inputSt} onFocus={focus} onBlur={blur} />
      : <input type={type} value={value} onChange={e => onChange(path, e.target.value)} style={inputSt} onFocus={focus} onBlur={blur} />
    }
  </div>
);

const ColorPicker = ({ label, value, onChange, hint }) => (
  <div style={{ marginBottom: '1.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <input
        type="color" value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '52px', height: '52px', border: 'none', borderRadius: '12px', cursor: 'pointer', padding: '4px', background: 'transparent' }}
      />
    </div>
    <div style={{ flex: 1 }}>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>{label}</label>
      {hint && <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', opacity: 0.6 }}>{hint}</p>}
      <code style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontFamily: 'monospace' }}>{value}</code>
    </div>
  </div>
);

// StatCard for Dashboard
const StatCard = ({ label, val, sub, color, Icon }) => (
  <div style={{ padding: '1.5rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', borderTop: `3px solid ${color}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{label}</p>
      <div style={{ width: '36px', height: '36px', background: `${color}18`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={18} color={color} />
      </div>
    </div>
    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '900', marginBottom: '0.3rem' }}>{val}</h3>
    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{sub}</p>
  </div>
);

// ─── Sidebar Sections ─────────────────────────────────────────────────────────
const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={17} /> },
  { id: 'theme', label: 'Colores & Tema', icon: <Palette size={17} /> },
  { id: 'general', label: 'General', icon: <Settings size={17} /> },
  { id: 'seo', label: 'SEO', icon: <Globe size={17} /> },
  { id: 'home', label: 'Inicio', icon: <Monitor size={17} /> },
  { id: 'about', label: 'Nosotros', icon: <Info size={17} /> },
  { id: 'services', label: 'Servicios', icon: <Zap size={17} /> },
  { id: 'contact', label: 'Contacto', icon: <Mail size={17} /> },
  { id: 'social', label: 'Redes Sociales', icon: <Globe size={17} /> },
  { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={17} /> },
  { id: 'footer', label: 'Footer', icon: <FileText size={17} /> },
  { id: 'images', label: 'Imágenes', icon: <ImageIcon size={17} /> },
];

// ─── Main Admin Component ─────────────────────────────────────────────────────
const Admin = () => {
  const {
    content, updateContent, updateServiceCard,
    images, updateImage,
    theme, updateTheme, resetTheme,
    saveContent, resetContent, saveStatus,
  } = useSite();

  const [active, setActive] = useState('dashboard');
  const onChange = (path, val) => updateContent(path, val);

  const renderSection = () => {
    switch (active) {

      // ── Dashboard ─────────────────────────────────────────────────────────
      case 'dashboard':
        return (
          <div>
            <h3 style={sectionTitle}><LayoutDashboard size={20} color="var(--accent-primary)" /> Resumen del Sitio</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <StatCard label="Páginas" val="10" sub="Todas activas" color="var(--accent-primary)" Icon={FileText} />
              <StatCard label="Secciones editables" val="12" sub="Textos e imágenes" color="var(--accent-secondary)" Icon={Settings} />
              <StatCard label="Imágenes" val={`${[images.logo, images.heroBg, images.aboutHero, ...(images.portfolio || [])].filter(Boolean).length}/9`} sub="Subidas" color="#10b981" Icon={ImageIcon} />
              <StatCard label="Tema activo" val="Custom" sub={`${theme.accentPrimary}`} color="#f59e0b" Icon={Palette} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {/* Quick Links */}
              <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', marginBottom: '1.2rem', fontSize: '1rem' }}>⚡ Accesos Rápidos</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    { label: '🎨 Cambiar Colores', section: 'theme' },
                    { label: '🏠 Editar Inicio', section: 'home' },
                    { label: '📱 Configurar WhatsApp', section: 'whatsapp' },
                    { label: '🖼️ Subir Imágenes', section: 'images' },
                    { label: '🔍 SEO & Metadatos', section: 'seo' },
                    { label: '🔗 Redes Sociales', section: 'social' },
                  ].map(q => (
                    <button key={q.section} onClick={() => setActive(q.section)}
                      style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >{q.label}</button>
                  ))}
                </div>
              </div>

              {/* Site Preview Info */}
              <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', marginBottom: '1.2rem', fontSize: '1rem' }}>📋 Información del Sitio</h4>
                {[
                  { label: 'Nombre', val: content.siteName },
                  { label: 'Tagline', val: content.tagline },
                  { label: 'Email', val: content.contact.email },
                  { label: 'WhatsApp', val: content.contact.whatsapp },
                  { label: 'Instagram', val: content.social?.instagram || '—' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{row.label}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', maxWidth: '180px', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.val}</span>
                  </div>
                ))}
              </div>

              {/* Color Preview */}
              <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', marginBottom: '1.2rem', fontSize: '1rem' }}>🎨 Tema Actual</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {Object.entries(theme).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: val, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}></div>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', flex: 1 }}>{key}</span>
                      <code style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{val}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      // ── Theme / Colors ────────────────────────────────────────────────────
      case 'theme':
        return (
          <div>
            <h3 style={sectionTitle}><Palette size={20} color="var(--accent-primary)" /> Colores & Tema</h3>
            <div style={{ padding: '14px 18px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', marginBottom: '2rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              🎨 <strong style={{ color: 'white' }}>Los cambios se aplican en tiempo real.</strong> Ve la página en otra pestaña y verás los colores actualizarse cada vez que selecciones uno. Presiona <strong style={{ color: 'white' }}>Guardar</strong> cuando estés conforme.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--accent-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}> Colores de Acento</h4>
                <ColorPicker label="Color Principal (Accent)" value={theme.accentPrimary} onChange={v => updateTheme('accentPrimary', v)} hint="Botones, links, acentos primarios" />
                <ColorPicker label="Color Secundario" value={theme.accentSecondary} onChange={v => updateTheme('accentSecondary', v)} hint="Gradientes, hover, detalles" />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--accent-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}> Colores de Fondo</h4>
                <ColorPicker label="Fondo Principal" value={theme.bgPrimary} onChange={v => updateTheme('bgPrimary', v)} hint="Color de fondo del cuerpo" />
                <ColorPicker label="Fondo Secundario" value={theme.bgSecondary} onChange={v => updateTheme('bgSecondary', v)} hint="Cards, navbar, sidebar" />
                <ColorPicker label="Fondo Terciario" value={theme.bgTertiary} onChange={v => updateTheme('bgTertiary', v)} hint="Footer, elementos anidados" />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '1.5rem', color: '#10b981', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}> Colores de Texto</h4>
                <ColorPicker label="Texto Principal" value={theme.textPrimary} onChange={v => updateTheme('textPrimary', v)} hint="Títulos y texto destacado" />
                <ColorPicker label="Texto Secundario" value={theme.textSecondary} onChange={v => updateTheme('textSecondary', v)} hint="Subtítulos, descripciones" />
              </div>
            </div>

            {/* Preset Themes */}
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '1.2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Temas Predefinidos</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[
                  { name: 'Azul (default)', p: '#3b82f6', s: '#8b5cf6', bg: '#050505' },
                  { name: '🟢 Esmeralda', p: '#10b981', s: '#06b6d4', bg: '#050a08' },
                  { name: '🔴 Rojo & Fuego', p: '#ef4444', s: '#f97316', bg: '#080505' },
                  { name: '🟡 Dorado', p: '#f59e0b', s: '#d97706', bg: '#06050a' },
                  { name: '🩷 Rosa Neon', p: '#ec4899', s: '#a855f7', bg: '#050508' },
                  { name: '🤍 Claro', p: '#3b82f6', s: '#8b5cf6', bg: '#f8fafc' },
                ].map(preset => (
                  <button key={preset.name}
                    onClick={() => {
                      updateTheme('accentPrimary', preset.p);
                      updateTheme('accentSecondary', preset.s);
                      updateTheme('bgPrimary', preset.bg);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.85rem', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = preset.p; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <div style={{ display: 'flex', gap: '3px' }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: preset.p }}></div>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: preset.s }}></div>
                    </div>
                    {preset.name}
                  </button>
                ))}
              </div>
              <button onClick={resetTheme} style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '8px 16px', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>
                <RefreshCw size={14} /> Restablecer colores originales
              </button>
            </div>
          </div>
        );

      // ── SEO ───────────────────────────────────────────────────────────────
      case 'seo':
        return (
          <div>
            <h3 style={sectionTitle}><Globe size={20} color="var(--accent-primary)" /> SEO & Metadatos</h3>
            <div style={{ padding: '14px 18px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', marginBottom: '2rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              🔍 Estos datos aparecen en Google cuando alguien busca tu sitio. Un buen título y descripción aumentan los clicks desde las búsquedas.
            </div>
            <Field label="Título de la Página (aparece en la pestaña del navegador)" path="seo.title" value={content.seo?.title || ''} onChange={onChange} hint="Máximo 60 caracteres recomendado" />
            <div style={{ fontSize: '0.75rem', color: content.seo?.title?.length > 60 ? '#ef4444' : 'var(--text-secondary)', marginTop: '-0.8rem', marginBottom: '1rem' }}>
              {content.seo?.title?.length || 0}/60 caracteres
            </div>
            <Field label="Descripción Meta (aparece en resultados de Google)" path="seo.description" value={content.seo?.description || ''} onChange={onChange} type="textarea" hint="Máximo 160 caracteres recomendado" />
            <div style={{ fontSize: '0.75rem', color: content.seo?.description?.length > 160 ? '#ef4444' : 'var(--text-secondary)', marginTop: '-0.8rem', marginBottom: '1rem' }}>
              {content.seo?.description?.length || 0}/160 caracteres
            </div>
            <Field label="Palabras clave (separadas por coma)" path="seo.keywords" value={content.seo?.keywords || ''} onChange={onChange} type="textarea" hint="ej: diseño web, marketing digital, agencia" />

            {/* Google Preview */}
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'white', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '0.5rem' }}>Vista previa en Google:</p>
              <p style={{ color: '#1a0dab', fontSize: '1.1rem', fontWeight: '500', fontFamily: 'Arial, sans-serif', marginBottom: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {content.seo?.title || 'Título del sitio'}
              </p>
              <p style={{ color: '#006621', fontSize: '0.82rem', fontFamily: 'Arial, sans-serif', marginBottom: '0.3rem' }}>
                https://tusitioweb.com
              </p>
              <p style={{ color: '#545454', fontSize: '0.88rem', fontFamily: 'Arial, sans-serif', lineHeight: '1.4' }}>
                {content.seo?.description || 'Descripción del sitio...'}
              </p>
            </div>
          </div>
        );

      case 'general':
        return (
          <div>
            <h3 style={sectionTitle}><Settings size={20} color="var(--accent-primary)" /> Configuración General</h3>
            <Field label="Nombre del Sitio / Logo texto" path="siteName" value={content.siteName} onChange={onChange} />
            <Field label="Tagline / Eslogan" path="tagline" value={content.tagline} onChange={onChange} />
            <Field label="Texto Botón CTA (Navbar)" path="ctaButton" value={content.ctaButton} onChange={onChange} />
          </div>
        );

      case 'home':
        return (
          <div>
            <h3 style={sectionTitle}><Monitor size={20} color="var(--accent-primary)" /> Página de Inicio</h3>
            <Field label="Badge (texto pequeño arriba del título)" path="home.badge" value={content.home.badge} onChange={onChange} />
            <Field label="Título Principal" path="home.title" value={content.home.title} onChange={onChange} />
            <Field label="Título Acento (con gradiente de color)" path="home.titleAccent" value={content.home.titleAccent} onChange={onChange} />
            <Field label="Subtítulo" path="home.subtitle" value={content.home.subtitle} onChange={onChange} type="textarea" />
            <Field label="Botón Primario" path="home.ctaText" value={content.home.ctaText} onChange={onChange} />
            <Field label="Botón Secundario" path="home.ctaSecondary" value={content.home.ctaSecondary} onChange={onChange} />
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
              <Field label="Título sección Features" path="home.featuresTitle" value={content.home.featuresTitle} onChange={onChange} />
              <Field label="Subtítulo sección Features" path="home.featuresSubtitle" value={content.home.featuresSubtitle} onChange={onChange} type="textarea" />
            </div>
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
              <Field label="Título CTA Final" path="home.ctaSectionTitle" value={content.home.ctaSectionTitle} onChange={onChange} />
              <Field label="Subtítulo CTA Final" path="home.ctaSectionSubtitle" value={content.home.ctaSectionSubtitle} onChange={onChange} type="textarea" />
            </div>
          </div>
        );

      case 'about':
        return (
          <div>
            <h3 style={sectionTitle}><Info size={20} color="var(--accent-primary)" /> Página Nosotros</h3>
            <Field label="Título" path="about.title" value={content.about.title} onChange={onChange} />
            <Field label="Subtítulo" path="about.subtitle" value={content.about.subtitle} onChange={onChange} type="textarea" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
              <div>
                <Field label="Título Misión" path="about.misionTitle" value={content.about.misionTitle} onChange={onChange} />
                <Field label="Texto Misión" path="about.misionText" value={content.about.misionText} onChange={onChange} type="textarea" />
              </div>
              <div>
                <Field label="Título Visión" path="about.visionTitle" value={content.about.visionTitle} onChange={onChange} />
                <Field label="Texto Visión" path="about.visionText" value={content.about.visionText} onChange={onChange} type="textarea" />
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div>
            <h3 style={sectionTitle}><Zap size={20} color="var(--accent-primary)" /> Editor de Servicios</h3>
            <Field label="Título de la sección" path="services.title" value={content.services.title} onChange={onChange} />
            <Field label="Subtítulo" path="services.subtitle" value={content.services.subtitle} onChange={onChange} type="textarea" />

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {(content.services?.cards || []).map((card, i) => (
                <div key={i} style={{ padding: '1.5rem', background: `rgba(59,130,246,0.04)`, border: '1px solid var(--glass-border)', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', color: 'var(--accent-primary)', fontSize: '0.85rem' }}>SERVICIO #{i + 1}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Título</label>
                      <input value={card.title} onChange={e => updateServiceCard(i, 'title', e.target.value)} style={inputSt} onFocus={focus} onBlur={blur} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Descripción</label>
                      <textarea value={card.desc} rows={2} onChange={e => updateServiceCard(i, 'desc', e.target.value)} style={inputSt} onFocus={focus} onBlur={blur} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div>
            <h3 style={sectionTitle}><Mail size={20} color="var(--accent-primary)" /> Página Contacto</h3>
            <Field label="Título" path="contact.title" value={content.contact.title} onChange={onChange} />
            <Field label="Subtítulo" path="contact.subtitle" value={content.contact.subtitle} onChange={onChange} type="textarea" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="WhatsApp (texto visible)" path="contact.whatsapp" value={content.contact.whatsapp} onChange={onChange} type="tel" />
              <Field label="Email" path="contact.email" value={content.contact.email} onChange={onChange} type="email" />
            </div>
            <Field label="Dirección" path="contact.address" value={content.contact.address} onChange={onChange} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Latitud del Mapa" path="contact.mapLat" value={String(content.contact.mapLat)} onChange={(p, v) => onChange(p, parseFloat(v) || 0)} type="number" />
              <Field label="Longitud del Mapa" path="contact.mapLng" value={String(content.contact.mapLng)} onChange={(p, v) => onChange(p, parseFloat(v) || 0)} type="number" />
            </div>
          </div>
        );

      case 'social':
        return (
          <div>
            <h3 style={sectionTitle}><Globe size={20} color="var(--accent-primary)" /> Redes Sociales</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>Estas URLs se usan en el Navbar, Footer y cualquier lugar donde aparezcan íconos de redes sociales.</p>
            {[
              { label: '📸 Instagram', path: 'social.instagram', placeholder: 'https://instagram.com/tuusuario' },
              { label: '▶️ YouTube', path: 'social.youtube', placeholder: 'https://youtube.com/@tucanal' },
              { label: '👍 Facebook', path: 'social.facebook', placeholder: 'https://facebook.com/tupagina' },
              { label: '🎵 TikTok', path: 'social.tiktok', placeholder: 'https://tiktok.com/@tuusuario' },
              { label: '💼 LinkedIn', path: 'social.linkedin', placeholder: 'https://linkedin.com/company/tuempresa' },
            ].map(s => (
              <Field key={s.path} label={s.label} path={s.path} value={content.social?.[s.path.split('.')[1]] || ''} onChange={onChange} />
            ))}
          </div>
        );

      case 'whatsapp':
        return (
          <div>
            <h3 style={sectionTitle}><MessageSquare size={20} color="#25d366" /> Configuración de WhatsApp</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>El botón flotante de WhatsApp que aparece en todas las páginas del sitio.</p>
            <Field label="Número de WhatsApp (formato internacional)" path="whatsappFloat.number" value={content.whatsappFloat?.number || ''} onChange={onChange} type="tel" hint="Ej: +521234567890 (sin espacios ni guiones)" />
            <Field label="Mensaje predefinido al abrir WhatsApp" path="whatsappFloat.message" value={content.whatsappFloat?.message || ''} onChange={onChange} type="textarea" hint="Este mensaje aparece pre-escrito cuando el usuario abre WhatsApp" />

            {/* Preview */}
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#128c7e15', border: '1px solid #25d36630', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', fontWeight: '700' }}>🔗 Enlace generado:</p>
              <code style={{ fontSize: '0.82rem', color: '#25d366', wordBreak: 'break-all', lineHeight: '1.6' }}>
                {`https://wa.me/${(content.whatsappFloat?.number || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(content.whatsappFloat?.message || '')}`}
              </code>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div>
            <h3 style={sectionTitle}><FileText size={20} color="var(--accent-primary)" /> Footer</h3>
            <Field label="Descripción de la empresa" path="footer.description" value={content.footer.description} onChange={onChange} type="textarea" />
            <Field label="Texto de Copyright" path="footer.copyright" value={content.footer.copyright} onChange={onChange} hint={`Ej: MiEmpresa. Todos los derechos reservados.`} />
          </div>
        );

      case 'images':
        return (
          <div>
            <h3 style={sectionTitle}><ImageIcon size={20} color="var(--accent-primary)" /> Gestión de Imágenes</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '2rem', padding: '12px 16px', background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', lineHeight: '1.6' }}>
              💡 Las imágenes se guardan en tu navegador como base64. <strong style={{ color: 'white' }}>Máximo 2 MB por imagen.</strong> Para imágenes más grandes, considera almacenamiento en la nube.
            </p>
            <ImageUploader label="Logo / Imagen de Marca" description="PNG transparente recomendado — 200×60 px" value={images.logo} onChange={val => updateImage('logo', val)} />
            <ImageUploader label="Imagen Hero (Fondo del Inicio)" description="JPG/WebP — 1920×1080 px" value={images.heroBg} onChange={val => updateImage('heroBg', val)} />
            <ImageUploader label="Imagen Nosotros" description="JPG — 800×600 px" value={images.aboutHero} onChange={val => updateImage('aboutHero', val)} />
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
              <p style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1.5rem' }}>Imágenes del Portafolio (6 slots)</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {(images.portfolio || [null, null, null, null, null, null]).map((img, i) => (
                  <ImageUploader key={i} label={`Proyecto #${i + 1}`} description="JPG/PNG — 800×533 px" value={img} onChange={val => updateImage('portfolio', val, i)} />
                ))}
              </div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--nav-height))', background: 'var(--bg-primary)' }}>

      {/* ── Sidebar ─────────────────────────── */}
      <aside style={{ width: '230px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--glass-border)', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 'var(--nav-height)', height: 'calc(100vh - var(--nav-height))', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem', padding: '0 0.3rem' }}>
          <div style={{ width: '30px', height: '30px', background: 'var(--accent-gradient)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Settings size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1rem' }}>CMS Panel</span>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.8rem', padding: '0 0.3rem' }}>Secciones</p>

        <ul style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
          {sections.map(s => (
            <li key={s.id} onClick={() => setActive(s.id)} style={{
              padding: '9px 12px', borderRadius: '7px',
              background: active === s.id ? 'rgba(59,130,246,0.15)' : 'transparent',
              color: active === s.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: active === s.id ? '700' : '500',
              fontSize: '0.88rem',
              display: 'flex', alignItems: 'center', gap: '9px', cursor: 'pointer',
              border: active === s.id ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
              fontFamily: 'var(--font-heading)', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (active !== s.id) e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { if (active !== s.id) e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {s.icon} {s.label}
            </li>
          ))}
        </ul>

        <div style={{ padding: '0.9rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '9px', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '1rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gradient)', flexShrink: 0 }}></div>
          <div>
            <p style={{ fontSize: '0.82rem', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>Admin</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>admin@sitio.com</p>
          </div>
        </div>
      </aside>

      {/* ── Main Editor ──────────────────────── */}
      <div style={{ flex: 1, padding: '2.5rem 3rem', overflowY: 'auto' }}>

        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800' }}>Panel de Administración</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', fontSize: '0.9rem' }}>Edita cualquier cosa → Guarda → Los cambios persisten.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {saveStatus && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '50px', background: saveStatus === 'saved' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: saveStatus === 'saved' ? '#10b981' : '#ef4444', fontWeight: '700', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap' }}>
                {saveStatus === 'saved' ? <><CheckCircle size={15} /> ¡Guardado!</> : <><AlertCircle size={15} /> Error</>}
              </div>
            )}
            <button onClick={resetContent} title="Restablecer todo" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', fontWeight: '600' }}>
              <RotateCcw size={15} /> Reset
            </button>
            <a href="/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', fontWeight: '600', textDecoration: 'none' }}>
              <Eye size={15} /> Ver Sitio
            </a>
            <button onClick={saveContent} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 20px', background: 'var(--accent-gradient)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'var(--font-heading)', fontWeight: '700', boxShadow: '0 4px 14px var(--accent-glow)' }}>
              <Save size={17} /> Guardar
            </button>
          </div>
        </div>

        {/* Editor Panel */}
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '2rem' }}>
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
