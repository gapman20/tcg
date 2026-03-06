import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ phoneNumber = "521234567890", message = "Hola, me interesa el Paquete Web Profesional" }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} color="white" />
    </a>
  );
};

export default WhatsAppButton;
