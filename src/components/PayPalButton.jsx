import React, { useEffect, useRef, useState } from 'react';
import { loadPayPalScript, isPayPalConfigured } from '../services/paypalService';

const PayPalButton = ({ 
  cartItems, 
  subtotal, 
  onSuccess, 
  onError, 
  onCancel,
  disabled = false,
  style = {}
}) => {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const initPayPal = async () => {
      if (!isPayPalConfigured()) {
        setError('PayPal no está configurado. Añade VITE_PAYPAL_CLIENT_ID a tu archivo .env');
        return;
      }

      const loaded = await loadPayPalScript();
      if (!mounted) return;
      
      if (!loaded) {
        setError('Error al cargar el SDK de PayPal');
        return;
      }

      setSdkReady(true);
    };

    initPayPal();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!sdkReady || !containerRef.current || !window.paypal) return;

    containerRef.current.innerHTML = '';
    
    const container = containerRef.current;
    
    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay',
        ...style
      },
      
      disabled: disabled,

      onClick: async (data, actions) => {
        if (cartItems.length === 0) {
          return actions.reject();
        }
        return actions.resolve();
      },

      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: 'TCG Card Purchase',
              amount: {
                currency_code: 'USD',
                value: (subtotal / 100).toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: (subtotal / 100).toFixed(2),
                  },
                },
              },
              items: cartItems.map(item => ({
                name: item.name.substring(0, 127),
                unit_amount: {
                  currency_code: 'USD',
                  value: (item.price / 100).toFixed(2),
                },
                quantity: String(item.quantity),
                category: 'PHYSICAL_GOODS',
              })),
            },
          ],
        });
      },

      onApprove: async (data, actions) => {
        try {
          const details = await actions.order.capture();
          if (onSuccess) {
            onSuccess({
              paypalOrderId: data.orderID,
              paypalDetails: details,
              status: 'paid',
            });
          }
        } catch (err) {
          if (onError) {
            onError(err);
          }
        }
      },

      onCancel: (data) => {
        if (onCancel) {
          onCancel(data);
        }
      },

      onError: (err) => {
        console.error('PayPal error:', err);
        if (onError) {
          onError(err);
        }
      },
    }).render(container);

    setIsReady(true);
  }, [sdkReady, cartItems, subtotal, disabled, style, onSuccess, onError, onCancel]);

  if (!isPayPalConfigured()) {
    return (
      <div style={{ 
        padding: '1rem', 
        background: 'rgba(255, 200, 0, 0.1)', 
        borderRadius: '8px',
        border: '1px solid rgba(255, 200, 0, 0.3)',
        textAlign: 'center',
        color: '#ffcc00',
        fontSize: '0.875rem',
        marginTop: '1rem'
      }}>
        PayPal sandbox no configurado. Añade tu client ID en el archivo .env
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '1rem', 
        background: 'rgba(239, 68, 68, 0.1)', 
        borderRadius: '8px',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        textAlign: 'center',
        color: '#ef4444',
        fontSize: '0.875rem',
        marginTop: '1rem'
      }}>
        {error}
      </div>
    );
  }

  if (!sdkReady) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.875rem'
      }}>
        Cargando PayPal...
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      style={{ 
        marginTop: '1rem',
        minHeight: '44px',
        opacity: isReady ? 1 : 0.5,
        transition: 'opacity 0.2s ease'
      }} 
    />
  );
};

export default PayPalButton;
