import React, {
  createContext, useState, useEffect,
} from 'react';
import { orderStatuses } from 'constants/order';


const OrderContext = createContext();
let currentId = 0;

export function OrderProvider({ children }) {
  const [allOrders, setAllOrders] = useState({});
  const [autoshipOrders, setAutoshipOrders] = useState([]);

  useEffect(() => {
    if (autoshipOrders.length > 0) {
      const autoshipTimers = [];
      autoshipOrders.forEach((orderId) => {
        const timer = setTimeout(() => {
          if (allOrders[orderId]) {
            shipOrder(orderId);
          }
          // CLEAN UP AT THE END
          if (orderId === autoshipOrders[autoshipOrders.length - 1]) {
            setAutoshipOrders([]);
          }
        }, 5000);
        autoshipTimers.push(timer);
      });

      // set
      return () => {
        // setAutoshipOrders([]);
        autoshipTimers.forEach((timer) => {
          clearTimeout(timer);
        });
      };
    }
  }, [autoshipOrders]);


  // ================= ORDER SUBSCRIBER ===============
  const orderSubscribers = new Set([]);
  const subscribeToAddOrder = (fn) => {
    orderSubscribers.add(fn);
  };
  const unsubscribeToAddOrder = (fn) => {
    orderSubscribers.delete(fn);
  };
  const notifyOrderCreateSubscriber = (newOrders) => {
    orderSubscribers.forEach((subscriber) => subscriber(newOrders));
  };


  const shipOrder = (id) => {
    const updatedOrders = { ...allOrders };
    updatedOrders[id].status = orderStatuses.IN_TRANSIT;
    setAllOrders(updatedOrders);
  };

  async function addOrder(order) {
    const id = currentId++;
    const newOrder = { ...order };
    newOrder.status = orderStatuses.PENDING_SHIPMENT;
    newOrder.time_created = new Date();
    newOrder.id = id;
    notifyOrderCreateSubscriber([newOrder]);
    setAllOrders({
      ...allOrders,
      [id]: newOrder,
    });
  }

  async function addBulkOrders(orderList) {
    const updatedOrders = { ...allOrders };
    const autoshipOrderId = [];
    const newOrders = [];
    orderList.forEach((order) => {
      const newOrder = { ...order };
      const id = currentId++;
      newOrder.status = orderStatuses.PENDING_SHIPMENT;
      newOrder.time_created = new Date();
      newOrder.id = id;
      newOrders.push(newOrder);
      updatedOrders[id] = newOrder;
      autoshipOrderId.push(id);
    });
    setAutoshipOrders([...autoshipOrders, ...autoshipOrderId]);
    notifyOrderCreateSubscriber(newOrders);
    setAllOrders(updatedOrders);
  }

  function confirmReceipt(id) {
    const orders = { ...allOrders };
    console.log(orders);
    orders[id].status = orderStatuses.COMPLETE;
    setAllOrders(orders);
  }

  function getAllOrders() {
    return [...Object.values(allOrders)];
  }

  function getOrderById(id) {
    return allOrders[id];
  }

  return (
    <OrderContext.Provider
      value={{
        addOrder,
        addBulkOrders,
        subscribeToAddOrder,
        unsubscribeToAddOrder,
        getOrderById,
        shipOrder,
        confirmReceipt,
        getAllOrders,
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
