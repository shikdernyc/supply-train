export const orderItems = { VENTILATOR: 'VENTILATOR', MEDICAL_STAFF: 'MEDICAL STAFF' };

export const orderTypes = { INCOMING: 'INCOMING', OUTGOING: 'OUTGOING' };

export const orderStatuses = { IN_TRANSIT: 'IN TRANSIT', PENDING_SHIPMENT: 'PENDING SHIPMENT', COMPLETE: 'COMPLETE' };

export const orderActions = {
  SHIPPED: 'SHIPPED',
  RECEIVED: 'RECEIVED'
};

export const orderStatusActions = {
  [orderStatuses.PENDING_SHIPMENT]: {
    [orderTypes.INCOMING]: null,
    [orderTypes.OUTGOING]: orderActions.SHIPPED
  },
  [orderStatuses.IN_TRANSIT]: {
    [orderTypes.INCOMING]: orderActions.RECEIVED,
    [orderTypes.OUTGOING]: null
  },
  [orderStatuses.COMPLETE]: {
    [orderTypes.INCOMING]: null,
    [orderTypes.OUTGOING]: null
  }
};
