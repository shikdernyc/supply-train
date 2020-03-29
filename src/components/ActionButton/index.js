import React from 'react';
import useOrderActions from 'hooks/useOrderActions';
import { orderStatusActions, orderActions } from 'constants/order';
import Button from 'components/Button';

export default function({ order }) {
  const { shipOrder, confirmReceipt } = useOrderActions();
  const action = orderStatusActions[order.status][order.type];

  if (!action) return null;

  function handleClick() {
    if (action === orderActions.SHIPPED) {
      shipOrder(order.id);
    } else {
      confirmReceipt(order.id);
    }
  }

  return (
    <Button size='sm' color='success' onClick={handleClick}>
      {action}
    </Button>
  );
}
