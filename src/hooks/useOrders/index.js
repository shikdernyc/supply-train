import { useContext } from 'react';
import OrderContext from 'contexts/Order';

export function useStateOrders(state) {
  const { getAllOrders } = useContext(OrderContext);
  const stateOrders = getAllOrders().filter(order => [order.to, order.from].includes(state[1]));
  return stateOrders;
}

export function useRecentOrders(count) {
  const { getAllOrders } = useContext(OrderContext);
  const recentOrders = getAllOrders()
    .sort((a, b) => b.time_created - a.time_created)
    .slice(0, count);
  return recentOrders;
}

export function useRecentStateOrders(state, count) {
  const { getAllOrders } = useContext(OrderContext);
  const orders = getAllOrders()
    .filter(order => [order.to, order.from].includes(state[1]))
    .sort((a, b) => b.time_created - a.time_created)
    .slice(0, count);
  return orders;
}
