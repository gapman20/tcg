import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import CheckoutForm from '../components/CheckoutForm';
import PayPalButton from '../components/PayPalButton';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { createOrder, loading } = useOrder();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'MX',
  });
  const [errors, setErrors] = useState({});
  const [paymentError, setPaymentError] = useState(null);
  const [paymentCancelled, setPaymentCancelled] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const formatPrice = (price) => `$${Number(price).toLocaleString('es-MX')}`;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nombre requerido';
    if (!formData.email.trim()) newErrors.email = 'Email requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.street.trim()) newErrors.street = 'Dirección requerida';
    if (!formData.city.trim()) newErrors.city = 'Ciudad requerida';
    if (!formData.state.trim()) newErrors.state = 'Estado requerido';
    if (!formData.zip.trim()) newErrors.zip = 'Código postal requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setPaymentError(null);
    setPaymentCancelled(false);
  };

  const handlePayPalSuccess = async (paymentData) => {
    if (!validateForm()) {
      setPaymentError('Por favor completa la información de envío');
      return;
    }

    try {
      const order = await createOrder({
        email: formData.email.toLowerCase(),
        items: items.map(item => ({
          cardId: item.cardId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        subtotal,
        total: subtotal,
        paypalOrderId: paymentData.paypalOrderId,
        paypalDetails: paymentData.paypalDetails,
        shippingAddress: {
          name: formData.name,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
        status: paymentData.status,
      });
      clearCart();
      navigate(`/pedido/${order.id}/confirmacion`);
    } catch (error) {
      console.error('Error creating order:', error);
      setPaymentError('Error al procesar tu pedido. Por favor intenta de nuevo.');
    }
  };

  const handlePayPalError = (error) => {
    console.error('PayPal error:', error);
    setPaymentError('Hubo un problema con el pago. Por favor intenta de nuevo.');
    setPaymentCancelled(false);
  };

  const handlePayPalCancel = (data) => {
    console.log('PayPal cancelled:', data);
    setPaymentCancelled(true);
    setPaymentError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  };

  if (items.length === 0) {
    return (
      <div className="page">
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h1 className="h2-premium">Checkout</h1>
          <p className="subtitle">Tu carrito está vacío</p>
          <Link to="/catalogo" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
            Ver Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page checkout-page" style={{ paddingBottom: '12rem' }}>
      <h1 className="h2-premium">Checkout</h1>
      
      {paymentCancelled && (
        <div className="alert alert-warning">
          Pago cancelado. Puedes intentar de nuevo cuando estés listo.
        </div>
      )}
      {paymentError && (
        <div className="alert alert-error">
          {paymentError}
        </div>
      )}
      
      <div className="checkout-layout">
        <div className="checkout-form-section">
          <CheckoutForm 
            formData={formData} 
            errors={errors} 
            onChange={handleChange} 
            onSubmit={handleSubmit} 
            loading={loading}
          />
        </div>
        
        <div className="checkout-summary-desktop glass-card">
          <h3>Resumen del pedido</h3>
          <div className="checkout-items">
            {items.map(item => (
              <div key={item.cardId} className="checkout-item">
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.name}</p>
                  <p className="checkout-item-qty">Qty: {item.quantity}</p>
                </div>
                <span className="checkout-item-price">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-totals">
            <div className="checkout-total-row">
              <span>Total</span>
              <span className="checkout-total-value">{formatPrice(subtotal)}</span>
            </div>
          </div>
          <div className="checkout-payment-section">
            <p className="checkout-payment-note">Paga de forma segura con PayPal</p>
            <PayPalButton
              cartItems={items}
              subtotal={subtotal}
              onSuccess={handlePayPalSuccess}
              onError={handlePayPalError}
              onCancel={handlePayPalCancel}
              disabled={loading}
            />
          </div>
        </div>
      </div>

      {/* Mobile Summary */}
      <div className="checkout-summary-mobile">
        <div className="checkout-summary-collapsed" onClick={() => setShowOrderSummary(!showOrderSummary)}>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
              {items.length} items
            </p>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{formatPrice(subtotal)}</p>
          </div>
          <button className="btn-primary checkout-pay-button" style={{ marginTop: 0, width: 'auto', padding: '12px 24px' }}>
            Pagar Ahora
          </button>
        </div>
        
        {showOrderSummary && (
          <div className="checkout-summary-expanded">
            <div className="checkout-items-mobile">
              {items.map(item => (
                <div key={item.cardId} className="checkout-item-mobile">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-total-mobile">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
