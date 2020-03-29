import { useContext } from 'react';
import OrderContext from 'contexts/Order';

export default function() {
  const orderActions = useContext(OrderContext);
  return orderActions;
}
