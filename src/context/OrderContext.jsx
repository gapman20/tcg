import React, { createContext, useContext, useState, useCallback } from 'react';

const ORDERS_KEY = 'tcg_orders';

const OrderContext = createContext(null);

const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 6).toLowerCase();
  return `ORD-${timestamp}-${random}`;
};

const loadOrders = () => {
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveOrders = (orders) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const OrderProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState(loadOrders);
  const [lookupResult, setLookupResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = useCallback(async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const orderId = generateOrderId();
      const order = {
        id: orderId,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const orders = loadOrders();
      orders.unshift(order);
      saveOrders(orders);
      
      setCurrentOrder(order);
      setOrderHistory(orders);
      return order;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const lookupOrder = useCallback(async (orderId, email) => {
    setLoading(true);
    setError(null);
    setLookupResult(null);
    try {
      const orders = loadOrders();
      const order = orders.find(o => 
        o.id === orderId && 
        o.email?.toLowerCase() === email.toLowerCase()
      );
      
      if (!order) {
        setLookupResult(null);
        return null;
      }
      
      setLookupResult(order);
      return order;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderById = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const orders = loadOrders();
      const order = orders.find(o => o.id === orderId);
      return order || null;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrderHistory = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const orders = loadOrders();
      const userOrders = orders
        .filter(o => o.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setOrderHistory(userOrders);
      return userOrders;
    } catch (e) {
      setError(e.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    setLoading(true);
    try {
      const orders = loadOrders();
      const index = orders.findIndex(o => o.id === orderId);
      
      if (index !== -1) {
        orders[index] = { 
          ...orders[index], 
          status, 
          updatedAt: new Date().toISOString() 
        };
        saveOrders(orders);
        
        setOrderHistory(orders);
        
        if (currentOrder?.id === orderId) {
          setCurrentOrder(prev => ({ ...prev, status }));
        }
      }
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [currentOrder]);

  const clearCurrentOrder = useCallback(() => setCurrentOrder(null), []);
  const clearLookupResult = useCallback(() => setLookupResult(null), []);
  const clearError = useCallback(() => setError(null), []);

  return (
    <OrderContext.Provider value={{
      currentOrder,
      orderHistory,
      lookupResult,
      loading,
      error,
      createOrder,
      lookupOrder,
      fetchOrderById,
      fetchOrderHistory,
      updateOrderStatus,
      clearCurrentOrder,
      clearLookupResult,
      clearError,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider');
  return ctx;
};
