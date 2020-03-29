import { orderStatuses } from 'constants/order';
import { orderTypes } from 'constants/order';
import { orderItems } from 'constants/order';
import state from 'constants/state';

export default [
  {
    id: 1,
    item: orderItems.VENTILATOR,
    type: orderTypes.INCOMING,
    to: 'DE',
    from: 'FL',
    quantity: 5000,
    expected_by: [new Date(), 5],
    status: orderStatuses.IN_TRANSIT,
    time_created: new Date()
  },
  {
    id: 2,
    item: orderItems.VENTILATOR,
    type: orderTypes.OUTGOING,
    to: 'NY',
    from: 'DE',
    quantity: 5000,
    expected_by: [new Date(), 5],
    status: orderStatuses.COMPLETE,
    time_created: new Date()
  },
  {
    id: 3,
    item: orderItems.VENTILATOR,
    type: orderTypes.INCOMING,
    to: 'WA',
    from: 'FL',
    quantity: 5000,
    expected_by: [new Date(), 5],
    status: orderStatuses.COMPLETE,
    time_created: new Date()
  },
  ...Object.keys(state).map((state, i) => ({
    id: 4 + i,
    item: orderItems.VENTILATOR,
    type: orderTypes.OUTGOING,
    to: state,
    from: state !== 'TX' ? 'TX' : 'VA',
    quantity: 5000,
    expected_by: [
      (() => {
        const d = new Date();
        d.setFullYear(new Date().getFullYear() - i);
        return d;
      })(),
      5
    ],
    status: orderStatuses.IN_TRANSIT,
    time_created: (() => {
      const d = new Date();
      d.setFullYear(new Date().getFullYear() - i);
      return d;
    })()
  })),
  ...Object.keys(state).map((state, i) => ({
    id: 64 + i,
    item: orderItems.MEDICAL_STAFF,
    type: orderTypes.INCOMING,
    to: state !== 'NY' ? 'NY' : 'NJ',
    from: state,
    quantity: 5000,
    expected_by: [
      (() => {
        const d = new Date();
        d.setFullYear(new Date().getFullYear() - i);
        return d;
      })(),
      5
    ],
    status: orderStatuses.COMPLETE,
    time_created: (() => {
      const d = new Date();
      d.setFullYear(new Date().getFullYear() - i);
      return d;
    })()
  }))
];
