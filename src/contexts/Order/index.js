import React, { createContext, useState, useRef } from 'react';
import { orderStatuses } from 'constants/order';
import sample_orders from './sample_orders';
import { orderTypes } from 'constants/order';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [allOrders, setAllOrders] = useState(new Map(sample_orders.map(o => [o.id, o])));
  const stateOrders = useRef(groupOrdersByState(allOrders));

  function addOrder(order) {
    const id = allOrders.size;
    const orders = new Map(allOrders);
    orders.set(id, order);
    setAllOrders(orders);
  }

  function shipOrder(id) {
    const orders = new Map(allOrders);
    orders.get(id).status = orderStatuses.IN_TRANSIT;
    setAllOrders(orders);
  }

  function confirmReceipt(id) {
    const orders = new Map(allOrders);
    orders.get(id).status = orderStatuses.COMPLETE;
    setAllOrders(orders);
  }

  function getOrdersInState(state) {
    return (stateOrders.current[state[1]] || []).map(order => ({
      ...order,
      type: order.to === state[1] ? orderTypes.INCOMING : orderTypes.OUTGOING
    }));
  }

  function getRecentOrders(count) {
    return Array.from(allOrders.values)
      .sort((a, b) => b.time_created - a.time_created)
      .slice(0, count);
  }

  return (
    <OrderContext.Provider
      value={{
        addOrder,
        shipOrder,
        confirmReceipt,
        getOrdersInState,
        getRecentOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

function groupOrdersByState(orders) {
  const ordersByState = {};
  orders.forEach(order => {
    const { from, to } = order;

    if (!ordersByState[from]) {
      ordersByState[from] = [];
    }
    if (!ordersByState[to]) {
      ordersByState[to] = [];
    }

    ordersByState[from].push(order);
    ordersByState[to].push(order);
  });
  return ordersByState;
}

export default OrderContext;
