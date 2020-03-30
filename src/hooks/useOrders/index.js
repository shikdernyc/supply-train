import { useContext } from 'react';
import OrderContext from 'contexts/Order';
import { orderStatusActions } from 'constants/order';
import { getTransitType } from 'utils/order/getPerspectiveProps';

export function useStateOrders(state) {
  const { getAllOrders } = useContext(OrderContext);
  const stateOrders = getAllOrders().filter(order => [order.to, order.from].includes(state[1]));
  return stateOrders;
}

const DEFAULT_COUNT = 5;

export function useRecentOrders(count = DEFAULT_COUNT) {
  const { getAllOrders } = useContext(OrderContext);
  const recentOrders = getAllOrders()
    .sort((a, b) => b.time_created - a.time_created)
    .slice(0, count);
  return recentOrders;
}

export function useRecentStateOrders(state, count = DEFAULT_COUNT) {
  const { getAllOrders } = useContext(OrderContext);
  const orders = getAllOrders()
    .filter(order => [order.to, order.from].includes(state[1]))
    .sort((a, b) => b.time_created - a.time_created)
    .slice(0, count);
  return orders;
}

export function useRecentPendingStateOrders(state, count = DEFAULT_COUNT) {
  const { getAllOrders } = useContext(OrderContext);
  const orders = getAllOrders()
    .filter(order => {
      const isForState = [order.to, order.from].includes(state[1]);
      const hasAction = Boolean(orderStatusActions[order.status][getTransitType(state, order)]);
      return isForState && hasAction;
    })
    .sort((a, b) => b.time_created - a.time_created)
    .slice(0, count);
  return orders;
}
