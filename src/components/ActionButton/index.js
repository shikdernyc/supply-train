import React from 'react';
import useOrderActions from 'hooks/useOrderActions';
import { orderStatusActions, orderActions } from 'constants/order';
import Button from 'components/Button';
import { getTransitType } from 'utils/order/getPerspectiveProps';
import useCurrentState from 'hooks/useCurrentState';

export default function({ order }) {
  const state = useCurrentState();
  const { shipOrder, confirmReceipt } = useOrderActions();
  const action = orderStatusActions[order.status][getTransitType(state, order)];

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
