import React from 'react';
import LocationMap from '../components/LocationMap';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const Contact = () => {
  const { content } = useSite();
  const c = content.contact;

  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '500px', height: '500px', background: 'var(--accent-secondary)', filter: 'blur(250px)', opacity: '0.1', borderRadius: '50%', zIndex: -1 }}></div>

      <header style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '2rem' }}>
        <div className="animate-fade-up">
          <h1 className="h1-premium mb-4">{c.title}</h1>
          <p className="subtitle">{c.subtitle}</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '4rem', alignItems: 'start' }}>

        {/* Contact Info & Map */}
        <div className="animate-fade-up delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="h2-premium" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Contacto Directo</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: <MessageSquare color="#25d366" size={20} />, label: 'WhatsApp (Prioritario)', val: c.whatsapp, bg: 'linear-gradient(135deg, rgba(37,211,102,0.1), transparent)' },
                { icon: <Mail color="var(--accent-primary)" size={20} />, label: 'Email Corporativo', val: c.email, bg: undefined },
                { icon: <MapPin color="#ef4444" size={20} />, label: 'Oficinas HQ', val: c.address, bg: 'linear-gradient(135deg, rgba(239,68,68,0.1), transparent)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                  <div className="icon-wrapper" style={{ margin: 0, width: '50px', height: '50px', borderRadius: '12px', background: item.bg }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem', color: 'var(--text-primary)' }}>{item.label}</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', overflow: 'hidden' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Encuéntranos</h4>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '300px' }}>
              <LocationMap center={[c.mapLat || 19.4326, c.mapLng || -99.1332]} zoom={14} />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card animate-fade-up delay-200" style={{ position: 'sticky', top: '120px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 className="h2-premium" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Solicitar Presupuesto</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Déjanos conocer un poco sobre tus objetivos.</p>

            {[
              { label: 'Nombre o Empresa', type: 'text', placeholder: 'Ej. Juan Pérez' },
              { label: 'Correo Electrónico', type: 'email', placeholder: 'correo@empresa.com' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} style={{ width: '100%', padding: '16px', background: 'rgba(5,5,5,0.5)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.3s' }} onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'} onBlur={e => e.target.style.borderColor = 'var(--glass-border)'} />
              </div>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>¿Qué necesitas?</label>
              <textarea placeholder="Cuéntanos sobre tu negocio..." rows="5" style={{ width: '100%', padding: '16px', background: 'rgba(5,5,5,0.5)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px', resize: 'vertical', fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 0.3s' }} onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'} onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}></textarea>
            </div>

            <button type="button" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
              Enviar Solicitud Inmediata <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
