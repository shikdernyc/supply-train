import { useContext, useEffect } from 'react';
import OrderContext from 'contexts/Order';

export default function useOnOrderCreate(fn) {
  const { subscribeToAddOrder, unsubscribeToAddOrder } = useContext(OrderContext);
  subscribeToAddOrder(fn);

  useEffect(() => () => {
    unsubscribeToAddOrder(fn);
    // eslint-disable-next-line
  }, []);
}
