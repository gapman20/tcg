import React from 'react';
import { useSite } from '../context/SiteContext';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const { content } = useSite();
  const cfg = content.whatsappFloat || {};
  const number  = (cfg.number  || '521234567890').replace(/[^0-9]/g, '');
  const message = cfg.message  || 'Hola! Me gustaría solicitar más información.';
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat en WhatsApp"
      title="¡Escríbenos por WhatsApp!"
    >
      <MessageCircle size={32} color="white" />
    </a>
  );
};

export default WhatsAppButton;
