import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartButton = () => {
  const { itemCount } = useCart();

  return (
    <Link to="/carrito" className="cart-button" aria-label={`Carrito de compras (${itemCount} items)`}>
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="cart-button-badge">{itemCount > 99 ? '99+' : itemCount}</span>
      )}
    </Link>
  );
};

export default CartButton;
