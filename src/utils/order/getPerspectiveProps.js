import { orderTypes } from 'constants/order';

export function getTransitType(state, order) {
  return order.to === state[1] ? orderTypes.INCOMING : orderTypes.OUTGOING;
}

export function getTransactionalState(state, order) {
  return order.to === state[1] ? order.from : order.to;
}
