import React, { createContext, useState } from 'react';
import { orderStatuses } from 'constants/order';
import sample_orders from './sample_orders';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [allOrders, setAllOrders] = useState(new Map(sample_orders.map(o => [o.id, o])));

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

  function getAllOrders() {
    return [...allOrders.values()];
  }

  return (
    <OrderContext.Provider
      value={{
        addOrder,
        shipOrder,
        confirmReceipt,
        getAllOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

// function groupOrdersByState(orders) {
//   const ordersByState = {};
//   orders.forEach(order => {
//     const { from, to } = order;

//     if (!ordersByState[from]) {
//       ordersByState[from] = [];
//     }
//     if (!ordersByState[to]) {
//       ordersByState[to] = [];
//     }

//     ordersByState[from].push(order);
//     ordersByState[to].push(order);
//   });
//   return ordersByState;
// }

export default OrderContext;
