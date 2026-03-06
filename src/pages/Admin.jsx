import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, Image as ImageIcon, BarChart, Bell, Search } from 'lucide-react';

const Admin = () => {
  return (
    <div className="page admin-demo" style={{ display: 'flex', minHeight: '90vh', background: 'var(--bg-primary)', marginTop: '-85px', paddingTop: '85px', padding: '0', maxWidth: '100vw' }}>
      
      {/* Premium Sidebar */}
      <aside style={{ width: '280px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--glass-border)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={18} color="white" />
          </div>
          NUCLEUS CMS
        </h2>
        
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '1px', marginBottom: '1rem', marginTop: '1rem' }}>MÓDULOS</div>
          {[
            { name: 'Vista General', icon: <LayoutDashboard size={20} />, active: true },
            { name: 'Páginas y Rutas', icon: <FileText size={20} /> },
            { name: 'Entradas de Blog', icon: <FileText size={20} /> },
            { name: 'Galería Media', icon: <ImageIcon size={20} /> },
            { name: 'CRM Clientes', icon: <Users size={20} /> },
            { name: 'Analítica Avanzada', icon: <BarChart size={20} /> }
          ].map((item, i) => (
            <li key={i} style={{ 
                padding: '12px 1rem', 
                borderRadius: '8px', 
                background: item.active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: item.active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: item.active ? '600' : '500',
                display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
                transition: 'all 0.2s',
                border: item.active ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent'
            }} onMouseEnter={(e) => !item.active && (e.currentTarget.style.color = 'var(--text-primary)')}
               onMouseLeave={(e) => !item.active && (e.currentTarget.style.color = 'var(--text-secondary)')}>
              {item.icon} {item.name}
            </li>
          ))}
        </ul>

        {/* Profile Teaser */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'var(--glass-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}></div>
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Admin Master</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>admin@empresa.com</p>
          </div>
        </div>
      </aside>

      {/* Main Dashboard UI */}
      <div style={{ flex: 1, padding: '2.5rem 3rem', overflowY: 'auto', background: 'var(--bg-primary)' }}>
        
        {/* Topbar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 className="h2-premium" style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>Panel de Control</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Métricas en tiempo real y edición de contenido.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
             <div style={{ background: 'var(--bg-secondary)', padding: '10px 16px', borderRadius: '50px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} color="var(--text-secondary)" />
                <input type="text" placeholder="Buscar..." style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '200px' }} />
             </div>
             <div style={{ position: 'relative', cursor: 'pointer' }}>
               <Bell size={24} color="var(--text-secondary)" />
               <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', border: '2px solid var(--bg-primary)' }}></div>
             </div>
          </div>
        </header>

        {/* High Tech Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
           {[
             { label: 'Sesiones Activas', val: '2,845', trend: '+12.5%', color: '#10b981' },
             { label: 'Leads Capturados', val: '142', trend: '+5.2%', color: '#3b82f6' },
             { label: 'Tasa de Conversión', val: '4.8%', trend: '+1.1%', color: '#8b5cf6' },
             { label: 'Tiempo en Sitio', val: '3m 42s', trend: '-0.5%', color: '#ef4444' }
           ].map((stat, i) => (
             <div key={i} className="glass-card" style={{ padding: '1.5rem 2rem', borderTop: `2px solid ${stat.color}` }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>{stat.label}</p>
                 <span style={{ fontSize: '0.8rem', color: stat.color, background: `${stat.color}15`, padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>{stat.trend}</span>
               </div>
               <h3 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>{stat.val}</h3>
             </div>
           ))}
        </div>

        {/* Editor Preview */}
        <div className="glass-card" style={{ padding: '2rem' }}>
           <h2 className="h2-premium" style={{ fontSize: '1.4rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} color="var(--accent-primary)" /> Editor Rápid: "Página de Inicio"
           </h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) minmax(300px, 1fr)', gap: '3rem' }}>
             
             {/* Form Editor */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Título Principal (H1)</label>
                  <input type="text" defaultValue="Eleva tu Empresa al Siguiente Nivel Digital" style={{ width: '100%', padding: '14px', background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '8px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Subtítulo Destacado</label>
                  <textarea rows="4" defaultValue="Diseñamos experiencias web de alto rendimiento. Estética premium, arquitectura escalable y un panel de control completamente autogestionable pensado para maximizar tus ventas." style={{ width: '100%', padding: '14px', background: 'var(--bg-secondary)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '8px', resize: 'vertical', outline: 'none' }}></textarea>
                </div>
                <button className="btn-primary" style={{ alignSelf: 'flex-start' }}>Publicar Cambios</button>
             </div>

             {/* Live Preview Teaser */}
             <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--glass-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '10px 15px', display: 'flex', gap: '8px', borderBottom: '1px solid var(--glass-border)' }}>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, background: 'var(--bg-primary)' }}>
                   <h1 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Eleva tu Empresa al Siguiente Nivel Digital</h1>
                   <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Diseñamos experiencias web de alto rendimiento...</p>
                </div>
             </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
