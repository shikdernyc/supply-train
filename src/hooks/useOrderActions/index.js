import { useContext } from 'react';
import OrderContext from 'contexts/Order';
import StateDataContext from 'contexts/StateData';
import state from 'constants/state';

export default function useOrderActions() {
  const orderActions = useContext(OrderContext);
  return orderActions;
}

export function useConfirmOrderReceipt() {
  const { confirmReceipt, getOrderById } = useContext(OrderContext);
  const { setStateVentilators, ventilators } = useContext(StateDataContext);

  const confirm = (orderId) => {
    const orderInfo = getOrderById(orderId);
    const stateName = state[orderInfo.to];
    confirmReceipt(orderId);
    setStateVentilators(stateName, ventilators[stateName] + orderInfo.quantity);
  };

  return confirm;
}
