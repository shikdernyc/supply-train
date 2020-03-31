import { useContext } from 'react';
import OrderContext from 'contexts/Order';
import { orderStatusActions, orderStatuses } from 'constants/order';
import { getTransitType } from 'utils/order/getPerspectiveProps';
import state from 'constants/state';

export function useStateOrders(state) {
  const { getAllOrders } = useContext(OrderContext);
  const stateOrders = getAllOrders().filter((order) => [order.to, order.from].includes(state[1]));
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
    .filter((order) => [order.to, order.from].includes(state[1]))
    .sort((a, b) => b.time_created - a.time_created)
    .slice(0, count);
  return orders;
}

export function useRecentPendingStateOrders(state, count = DEFAULT_COUNT) {
  const { getAllOrders } = useContext(OrderContext);
  const allOrders = getAllOrders();
  const orders = allOrders
    .filter((order) => {
      const isForState = [order.to, order.from].includes(state[1]);
      const hasAction = Boolean(orderStatusActions[order.status][getTransitType(state, order)]);
      return isForState && hasAction;
    })
    .sort((a, b) => b.time_created - a.time_created)
    .slice(0, count);
  return orders;
}

export function useAllIncomingOrders() {
  const { getAllOrders } = useContext(OrderContext);
  const orders = getAllOrders();
  const incomingOrders = {};
  orders.forEach(({
    status,
    to,
    quantity,
  }) => {
    if (
      status === orderStatuses.PENDING_SHIPMENT
      || status === orderStatuses.IN_TRANSIT
    ) {
      const stateName = state[to];
      // eslint-disable-next-line no-prototype-builtins
      if (!incomingOrders.hasOwnProperty(stateName)) {
        incomingOrders[stateName] = 0;
      }
      incomingOrders[stateName] += quantity;
    }
  });
  return incomingOrders;
}
