import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import ImageUploader from '../components/ImageUploader';
import {
  LayoutDashboard, FileText, Settings, Mail, Info,
  Save, RotateCcw, CheckCircle, AlertCircle, Eye,
  Image as ImageIcon, Palette, BarChart2, Globe,
  MessageSquare, Zap, Users, TrendingUp, Monitor,
  ToggleLeft, ToggleRight, RefreshCw, Plus, Trash2, Package,
  Columns, ArrowUp, ArrowDown, Bold, List, BarChart, Lock
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
  <div style={{ padding: '1.5rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', borderTop: `3px solid ${color}`, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.05, transform: 'translate(20%, -20%)' }}><Icon size={120} /></div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{label}</p>
      <div style={{ width: '36px', height: '36px', background: `${color}18`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={18} color={color} />
      </div>
    </div>
    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '900', marginBottom: '0.3rem', position: 'relative', zIndex: 1 }}>{val}</h3>
    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
      {typeof sub === 'string' && sub.includes('+') && <TrendingUp size={12} color="#10b981" />}
      {sub}
    </p>
  </div>
);

// CSS Bar Chart Component
const SimpleBarChart = ({ data }) => {
  const max = Math.max(...data, 1);
  const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  
  return (
    <div style={{ padding: '2rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800' }}>Visitas del Sitio</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Últimos 7 días (Datos Simulados)</p>
        </div>
        <div style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--accent-primary)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrendingUp size={14} /> +12% esta semana
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px', paddingTop: '20px' }}>
        {data.map((val, i) => {
          const heightPct = Math.max((val / max) * 100, 2);
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '6px 6px 0 0' }}>
                <div 
                  className="chart-bar"
                  title={`${val} visitas`}
                  style={{ 
                    width: '80%', height: `${heightPct}%`, 
                    background: i === data.length - 1 ? 'var(--accent-gradient)' : 'var(--accent-primary)',
                    opacity: i === data.length - 1 ? 1 : 0.6,
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.5s ease-out',
                    animation: `growUp 1s ease-out forwards ${i * 0.1}s`
                  }} 
                />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes growUp { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); transform-origin: bottom; } }
        .chart-bar:hover { opacity: 1 !important; filter: brightness(1.2); cursor: pointer; }
      `}} />
    </div>
  );
};

// MD Toolbar
const Toolbar = ({ onFormat }) => (
  <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
    <button onClick={() => onFormat('bold')} title="Negrita" style={{ padding: '4px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-secondary)' }}><Bold size={14} /></button>
    <button onClick={() => onFormat('list')} title="Lista" style={{ padding: '4px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-secondary)' }}><List size={14} /></button>
  </div>
);

// Format helper
const insertFormat = (path, value, formatType, onChange) => {
  const formats = { 'bold': '**Texto Destacado**', 'list': '\\n- Punto de lista' };
  const strVal = value || '';
  onChange(path, strVal + (strVal && strVal !== '' ? ' ' : '') + formats[formatType]);
};

// ─── Sidebar Sections ─────────────────────────────────────────────────────────
const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={17} /> },
  { id: 'inbox', label: 'Bandeja de Entrada', icon: <Mail size={17} /> },
  { id: 'pages', label: 'Páginas & Menú', icon: <FileText size={17} /> },
  { id: 'products', label: 'Productos', icon: <Package size={17} /> },
  { id: 'theme', label: 'Colores & Tema', icon: <Palette size={17} /> },
  { id: 'general', label: 'General', icon: <Settings size={17} /> },
  { id: 'seo', label: 'SEO', icon: <Globe size={17} /> },
  { id: 'home', label: 'Inicio', icon: <Monitor size={17} /> },
  { id: 'about', label: 'Nosotros', icon: <Info size={17} /> },
  { id: 'services', label: 'Servicios', icon: <Zap size={17} /> },
  { id: 'blog', label: 'Blog', icon: <FileText size={17} /> },
  { id: 'contact', label: 'Contacto', icon: <Mail size={17} /> },
  { id: 'social', label: 'Redes Sociales', icon: <Globe size={17} /> },
  { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={17} /> },
  { id: 'footer', label: 'Footer', icon: <FileText size={17} /> },
  { id: 'images', label: 'Imágenes', icon: <ImageIcon size={17} /> },
];

// ─── Main Admin Component ─────────────────────────────────────────────────────
const Admin = () => {
  const {
    content, updateContent, updateServiceCard, moveServiceCard,
    images, updateImage,
    theme, updateTheme, resetTheme,
    blogPosts = [], createBlogPost, updateBlogPost, deleteBlogPost, duplicateBlogPost,
    pages = [], createPage, updatePage, deletePage, movePage,
    products = [], createProduct, updateProduct, deleteProduct, moveProduct,
    analytics, trackAnalytics,
    inbox = [], markMessageRead, deleteMessage, logout,
    saveContent, resetContent, saveStatus,
  } = useSite();

  const [active, setActive] = useState('dashboard');
  const [editPost, setEditPost] = useState(null);
  const [splitView, setSplitView] = useState(false);
  const [toasts, setToasts] = useState([]);

  const onChange = (path, val) => updateContent(path, val);

  useEffect(() => {
    if (saveStatus === 'saved') {
      const id = Date.now();
      setToasts(prev => [...prev, { id, msg: '¡Cambios Guardados Exitosamente!', type: 'success' }]);
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
    } else if (saveStatus === 'error') {
      const id = Date.now();
      setToasts(prev => [...prev, { id, msg: 'Error al guardar', type: 'error' }]);
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
    }
  }, [saveStatus]);

  const renderSection = () => {
    switch (active) {

      // ── Dashboard ─────────────────────────────────────────────────────────
      case 'dashboard':
        const activePages = pages.filter(p => p.active).length;
        const activeProds = products.filter(p => p.active).length;
        const totalImages = [images.logo, images.heroBg, images.aboutHero, ...(images.portfolio || [])].filter(Boolean).length;
        
        return (
          <div>
            <h3 style={sectionTitle}><LayoutDashboard size={20} color="var(--accent-primary)" /> Panel de Rendimiento y Resumen</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <StatCard label="Clics WhatsApp" val={analytics.whatsapp_clicks || 0} sub="+3% vs sem. ant." color="#25d366" Icon={MessageSquare} />
              <StatCard label="Páginas Activas" val={activePages} sub={`de ${pages.length} totales`} color="var(--accent-primary)" Icon={FileText} />
              <StatCard label="Productos en Catálogo" val={activeProds} sub={`${products.length - activeProds} ocultos`} color="#f59e0b" Icon={Package} />
              <StatCard label="Imágenes Subidas" val={`${totalImages}/9`} sub="Formatos óptimos" color="#10b981" Icon={ImageIcon} />
            </div>

            {/* Simulated Chart */}
            <SimpleBarChart data={analytics.visits_simulated} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* Quick Links */}
              <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', marginBottom: '1.2rem', fontSize: '1rem' }}>⚡ Accesos Rápidos</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    { label: '📄 Menú & Páginas', section: 'pages' },
                    { label: '📦 Productos', section: 'products' },
                    { label: '🎨 Cambiar Colores', section: 'theme' },
                    { label: '🏠 Editar Inicio', section: 'home' },
                    { label: '📱 Configurar WhatsApp', section: 'whatsapp' },
                    { label: '🖼️ Subir Imágenes', section: 'images' },
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

      // ── Pages / Menu ──────────────────────────────────────────────────────
      case 'pages':
        return (
          <div>
            <h3 style={sectionTitle}><FileText size={20} color="var(--accent-primary)" /> Páginas & Menú</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>Activa o desactiva las páginas, cambia su nombre en el menú, o crea páginas personalizadas nuevas.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
              {pages.map((page, i) => (
                <div key={page.id} style={{ padding: '1.5rem', background: 'var(--glass-bg)', border: `1px solid ${page.active ? 'var(--accent-primary)' : 'var(--glass-border)'}`, borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.1rem', color: page.active ? 'white' : 'var(--text-secondary)' }}>{page.name}</span>
                      {page.isCustom ? 
                        <span style={{ fontSize: '0.7rem', background: 'rgba(245,158,11,0.2)', color: '#f59e0b', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>Personalizada</span> 
                        : 
                        <span style={{ fontSize: '0.7rem', background: 'rgba(59,130,246,0.2)', color: '#3b82f6', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>Integrada</span>
                      }
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => movePage(i, 'up')} style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}><ArrowUp size={14} /></button>
                        <button onClick={() => movePage(i, 'down')} style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}><ArrowDown size={14} /></button>
                      </div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        <input type="checkbox" checked={page.active} onChange={e => updatePage(page.id, 'active', e.target.checked)} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                        Visible en Menú
                      </label>
                      {page.isCustom && (
                        <button onClick={() => { if(confirm('¿Eliminar esta página?')) deletePage(page.id); }} style={{ background: 'transparent', border: '1px solid #ef444455', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                          <Trash2 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Eliminar
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Nombre en el Menú</label>
                      <input value={page.name} onChange={e => updatePage(page.id, 'name', e.target.value)} style={inputSt} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>URL (Ruta)</label>
                      <input value={page.path} onChange={e => updatePage(page.id, 'path', e.target.value)} style={inputSt} disabled={!page.isCustom} />
                      {!page.isCustom && <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>La URL de las páginas integradas no se puede cambiar.</p>}
                    </div>
                  </div>
                  
                  {page.isCustom && (
                    <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                      <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent-primary)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contenido Visual</h4>
                      
                      <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Título de la Página</label>
                        <input value={page.pageTitle || ''} onChange={e => updatePage(page.id, 'pageTitle', e.target.value)} style={{ ...inputSt, fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 'bold' }} placeholder="Ej: Nuestras Ofertas" />
                      </div>
                      
                      <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Subtítulo o Resumen</label>
                        <textarea value={page.pageSubtitle || ''} onChange={e => updatePage(page.id, 'pageSubtitle', e.target.value)} rows={2} style={inputSt} />
                      </div>
                      
                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Texto Completo (Soporta Markdown Básico)</label>
                        <Toolbar onFormat={(t) => insertFormat(page.id, page.pageText, t, (p,v) => updatePage(p, 'pageText', v))} />
                        <textarea value={page.pageText || ''} onChange={e => updatePage(page.id, 'pageText', e.target.value)} rows={6} style={inputSt} />
                      </div>

                      <ImageUploader label="Imagen Destacada" description="JPG/PNG. Se mostrará junto al texto." value={page.pageImage} onChange={val => updatePage(page.id, 'pageImage', val)} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button onClick={() => createPage()} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'var(--glass-bg)', border: '1px dashed var(--glass-border)', borderRadius: '12px', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 'bold', width: '100%', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}>
              <Plus size={18} /> Agregar Nueva Página
            </button>
          </div>
        );

      // ── Products ─────────────────────────────────────────────────────────
      case 'products':
        return (
          <div>
            <h3 style={sectionTitle}><Package size={20} color="var(--accent-primary)" /> Catálogo de Productos</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>Gestiona los productos eléctricos que se mostrarán en la página de Productos.</p>
            
            <button className="btn-primary" onClick={() => createProduct()} style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '0.9rem' }}>
              <Plus size={16} /> Añadir Producto
            </button>
            
            <div style={{ display: 'grid', gridTemplateColumns: splitView ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {products.map((prod, i) => (
                <div key={prod.id} style={{ padding: '1.5rem', background: 'var(--glass-bg)', border: `1px solid ${prod.active ? 'var(--accent-primary)' : 'var(--glass-border)'}`, borderRadius: '12px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => moveProduct(i, 'up')} style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}><ArrowUp size={14} /></button>
                      <button onClick={() => moveProduct(i, 'down')} style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}><ArrowDown size={14} /></button>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      <input type="checkbox" checked={prod.active} onChange={e => updateProduct(prod.id, 'active', e.target.checked)} style={{ width: '15px', height: '15px', cursor: 'pointer' }} />
                      Activo (Visible)
                    </label>
                    <button onClick={() => { if(confirm('¿Eliminar este producto?')) deleteProduct(prod.id); }} style={{ background: 'transparent', border: '1px solid #ef444455', color: '#ef4444', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>
                      Eliminar
                    </button>
                  </div>
                  
                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Nombre</label>
                    <input value={prod.name} onChange={e => updateProduct(prod.id, 'name', e.target.value)} style={{ ...inputSt, padding: '8px 12px', fontSize: '0.9rem' }} />
                  </div>
                  
                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Precio (opcional)</label>
                    <input value={prod.price} onChange={e => updateProduct(prod.id, 'price', e.target.value)} style={{ ...inputSt, padding: '8px 12px', fontSize: '0.9rem' }} placeholder="Ej: $120.00" />
                  </div>

                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Descripción</label>
                    <Toolbar onFormat={(t) => insertFormat(prod.id, prod.description, t, (p,v) => updateProduct(p, 'description', v))} />
                    <textarea value={prod.description} onChange={e => updateProduct(prod.id, 'description', e.target.value)} rows={3} style={{ ...inputSt, padding: '8px 12px', fontSize: '0.85rem' }} />
                  </div>
                  
                  <ImageUploader label="Foto del Producto" description="Cuadrada (ej: 600x600)" value={prod.image} onChange={val => updateProduct(prod.id, 'image', val)} />
                </div>
              ))}
              {products.length === 0 && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No hay productos registrados.</p>}
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
                <ColorPicker label="Fondo Secundario" value={theme.bgSecondary} onChange={v => updateTheme('bgSecondary', v)} hint="Base secundaria" />
                <ColorPicker label="Fondo Terciario" value={theme.bgTertiary} onChange={v => updateTheme('bgTertiary', v)} hint="Footer, elementos anidados" />
                <ColorPicker label="Fondo Navbar (Menu)" value={theme.navbarColor || theme.bgSecondary} onChange={v => updateTheme('navbarColor', v)} hint="Color de fondo y blur superior" />
                <ColorPicker label="Fondo Tarjetas (Glass)" value={theme.cardBg || theme.bgSecondary} onChange={v => updateTheme('cardBg', v)} hint="Tarjetas, editor y paneles" />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', marginBottom: '1.5rem', color: '#10b981', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}> Colores de Texto Generales</h4>
                <ColorPicker label="Texto Principal" value={theme.textPrimary} onChange={v => updateTheme('textPrimary', v)} hint="Títulos y texto destacado globales" />
                <ColorPicker label="Texto Secundario" value={theme.textSecondary} onChange={v => updateTheme('textSecondary', v)} hint="Subtítulos, descripciones globales" />

                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', marginTop: '2.5rem', marginBottom: '1.5rem', color: '#ef4444', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}> Textos por Módulo (Específicos)</h4>
                <ColorPicker label="Texto Navbar (Principal)" value={theme.textNavbarPrimary || theme.textPrimary} onChange={v => updateTheme('textNavbarPrimary', v)} hint="Logo y links al hacer hover en Navbar" />
                <ColorPicker label="Texto Navbar (Secundario)" value={theme.textNavbarSecondary || theme.textSecondary} onChange={v => updateTheme('textNavbarSecondary', v)} hint="Links inactivos en el Navbar" />
                <ColorPicker label="Texto Cards (Principal)" value={theme.textCardPrimary || theme.textPrimary} onChange={v => updateTheme('textCardPrimary', v)} hint="Títulos dentro de las tarjetas Glass" />
                <ColorPicker label="Texto Cards (Secundario)" value={theme.textCardSecondary || theme.textSecondary} onChange={v => updateTheme('textCardSecondary', v)} hint="Descripciones dentro de las tarjetas" />
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
            
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={18} /> Seguridad Institucional
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>Cambia la contraseña maestra de acceso al panel ("admin123" por defecto). Por precaución cierra sesión y vuelve a entrar tras cambiarla.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <input id="oldPass" type="password" placeholder="Contraseña Actual" style={inputSt} />
                <input id="newPass" type="password" placeholder="Nueva Contraseña" style={inputSt} />
              </div>
              <button 
                onClick={async () => {
                  const oldP = document.getElementById('oldPass').value;
                  const newP = document.getElementById('newPass').value;
                  if(!oldP || !newP) {
                    const id = Date.now();
                    setToasts(prev => [...prev, { id, msg: 'Llena ambos campos de contraseña', type: 'error' }]);
                    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
                    return;
                  }
                  const success = await changePassword(oldP, newP);
                  if(success) {
                    document.getElementById('oldPass').value = '';
                    document.getElementById('newPass').value = '';
                    const id = Date.now();
                    setToasts(prev => [...prev, { id, msg: 'Contraseña Actualizada Correctamente', type: 'success' }]);
                    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
                  } else {
                    const id = Date.now();
                    setToasts(prev => [...prev, { id, msg: 'Error al actualizar la contraseña / Actual errónea', type: 'error' }]);
                    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
                  }
                }} 
                style={{ padding: '10px 18px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.5)', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
              >
                Actualizar Contraseña Maestra
              </button>
            </div>
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

      case 'blog':
        return (
          <div>
            <h3 style={sectionTitle}><FileText size={20} color="var(--accent-primary)" /> Entradas de Blog</h3>

            {!editPost ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '2rem' }}>
                {/* LIST */}
                <div style={{ borderRight: '1px solid var(--glass-border)', paddingRight: '2rem' }}>
                  <button className="btn-primary" onClick={() => setEditPost(createBlogPost())} style={{ width: '100%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}>
                    + Nuevo Artículo
                  </button>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {blogPosts.map(post => (
                      <div key={post.id}
                        onClick={() => setEditPost(post.id)}
                        style={{ padding: '12px 14px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s', borderLeft: post.published ? '3px solid #10b981' : '3px solid #f59e0b' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                      >
                        <div style={{ overflow: 'hidden' }}>
                          <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginBottom: '4px' }}>{post.title || 'Sin Título'}</h5>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{post.date} • {post.published ? 'Público' : 'Borrador'}</p>
                        </div>
                      </div>
                    ))}
                    {blogPosts.length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem' }}>No hay artículos aún.</p>}
                  </div>
                </div>
                {/* STATS/PLACEHOLDER */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  <FileText size={48} color="var(--glass-border)" style={{ marginBottom: '1rem' }} />
                  <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Selecciona un artículo para editar</p>
                  <p style={{ fontSize: '0.85rem' }}>o crea uno nuevo para empezar a escribir.</p>
                </div>
              </div>
            ) : (
              // EDITOR
              <div style={{ border: '1px solid var(--glass-border)', borderRadius: '12px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <div style={{ padding: '14px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => setEditPost(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    ← Volver a la lista
                  </button>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => { duplicateBlogPost(editPost); setEditPost(null); }} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Duplicar</button>
                    <button onClick={() => { if (confirm('¿Seguro que deseas eliminar este artículo?')) { deleteBlogPost(editPost); setEditPost(null); } }} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Eliminar</button>
                  </div>
                </div>

                {blogPosts.filter(p => p.id === editPost).map(post => (
                  <div key={post.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 300px' }}>

                    {/* Main Editor Fields */}
                    <div style={{ padding: '2rem', borderRight: '1px solid var(--glass-border)' }}>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Título del Artículo</label>
                        <input value={post.title} onChange={e => updateBlogPost(post.id, 'title', e.target.value)} style={{ ...inputSt, fontSize: '1.2rem', padding: '14px', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }} />
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Extracto (Resumen corto)</label>
                        <textarea value={post.excerpt} onChange={e => updateBlogPost(post.id, 'excerpt', e.target.value)} rows={2} style={inputSt} />
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Contenido Completo (Markdown / Texto)</label>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>💡 Tip: Presiona Enter dos veces para crear un nuevo párrafo.</div>
                        <textarea value={post.content} onChange={e => updateBlogPost(post.id, 'content', e.target.value)} rows={15} style={{ ...inputSt, fontFamily: 'monospace', lineHeight: '1.6', fontSize: '0.9rem' }} />
                      </div>
                    </div>

                    {/* Meta Sidebar */}
                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.01)' }}>
                      <div style={{ marginBottom: '2rem', padding: '1rem', background: post.published ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${post.published ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`, borderRadius: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>
                          <input type="checkbox" checked={post.published} onChange={e => updateBlogPost(post.id, 'published', e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                          {post.published ? '🟢 Estado: Publicado (Visible)' : '🟡 Estado: Borrador (Oculto)'}
                        </label>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Autor</label>
                        <input value={post.author} onChange={e => updateBlogPost(post.id, 'author', e.target.value)} style={inputSt} />
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Fecha de Publicación</label>
                        <input value={post.date} onChange={e => updateBlogPost(post.id, 'date', e.target.value)} style={inputSt} />
                      </div>

                      <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Etiquetas (Tags)</label>
                        <input value={post.tags} onChange={e => updateBlogPost(post.id, 'tags', e.target.value)} placeholder="Ej: diseño, marketing, tips" style={inputSt} />
                      </div>

                      <ImageUploader label="Imagen de Portada (Opcional)" description="Recomendado: 1200x630 px. Máx 2MB" value={post.image} onChange={val => updateBlogPost(post.id, 'image', val)} />
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => moveServiceCard(i, 'up')} style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}><ArrowUp size={14} /></button>
                      <button onClick={() => moveServiceCard(i, 'down')} style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}><ArrowDown size={14} /></button>
                    </div>
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

      case 'inbox':
        const unreadCount = inbox.filter(m => !m.read).length;
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={sectionTitle}><Mail size={20} color="var(--accent-primary)" /> Bandeja de Entrada</h3>
              {unreadCount > 0 && (
                <span style={{ background: '#ef4444', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {unreadCount} sin leer
                </span>
              )}
            </div>
            
            {inbox.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--glass-bg)', borderRadius: '12px', border: '1px dashed var(--glass-border)' }}>
                <MessageSquare size={48} color="var(--glass-border)" style={{ marginBottom: '1rem' }} />
                <p style={{ color: 'var(--text-secondary)' }}>Aún no hay mensajes en tu bandeja.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {inbox.map(msg => (
                  <div key={msg.id} style={{ padding: '1.5rem', background: 'var(--glass-bg)', border: `1px solid ${msg.read ? 'var(--glass-border)' : 'var(--accent-primary)'}`, borderRadius: '12px', position: 'relative' }}>
                    {!msg.read && <div style={{ position: 'absolute', top: '15px', right: '15px', width: '10px', height: '10px', background: 'var(--accent-primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-primary)' }} />}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>{msg.name}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{msg.email} • {new Date(msg.date).toLocaleDateString()}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {!msg.read && (
                          <button onClick={() => markMessageRead(msg.id)} style={{ background: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>Marcar Leído</button>
                        )}
                        <button onClick={() => { if(confirm('¿Eliminar mensaje de manera permanente?')) deleteMessage(msg.id); }} style={{ background: 'transparent', border: '1px solid #ef444455', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}><Trash2 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Eliminar</button>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
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

        <div style={{ padding: '0.9rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gradient)', flexShrink: 0 }}></div>
            <div>
              <p style={{ fontSize: '0.82rem', fontWeight: '700', fontFamily: 'var(--font-heading)' }}>Admin</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Conectado</p>
            </div>
          </div>
          <button onClick={logout} title="Cerrar Sesión" style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
             Salir
          </button>
        </div>
      </aside>

      {/* ── Main Layout ──────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* Editor Half */}
        <div style={{ flex: splitView ? '0 0 500px' : 1, padding: '2.5rem', overflowY: 'auto', borderRight: splitView ? '1px solid var(--glass-border)' : 'none', transition: 'flex 0.3s' }}>
          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '800' }}>Panel de Administración</h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', fontSize: '0.9rem' }}>Edita cualquier cosa → Guarda → Los cambios persisten.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setSplitView(!splitView)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: splitView ? 'var(--accent-primary)' : 'transparent', border: '1px solid var(--glass-border)', borderRadius: '8px', color: splitView ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', fontWeight: '600' }}>
                <Columns size={15} /> {splitView ? 'Cerrar Vista Previa' : 'Vista Dividida'}
              </button>
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

        {/* Live Preview Iframe */}
        {splitView && (
          <div style={{ flex: 1, background: '#fff', position: 'relative' }}>
            <iframe src="/" style={{ width: '100%', height: '100%', border: 'none' }} title="Vista Previa" />
            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '5px 10px', borderRadius: '20px', fontSize: '0.75rem', backdropFilter: 'blur(5px)' }}>
              Live Preview
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 9999 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ 
            background: t.type === 'success' ? '#10b981' : '#ef4444', 
            color: 'white', padding: '12px 20px', borderRadius: '8px', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)', fontFamily: 'var(--font-body)', 
            fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            {t.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {t.msg}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}} />
    </div>
  );
};

export default Admin;
