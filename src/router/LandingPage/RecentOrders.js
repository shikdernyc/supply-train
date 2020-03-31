import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useRecentOrders } from 'hooks/useOrders';
import { orderStatuses } from 'constants/order';
import state from 'constants/state';
import { Link } from 'react-router-dom';

const useListItemStyles = makeStyles({
  listText: {
    color: 'white',
    textAlign: 'left',
  },
});


function OrderListItem({ orderDetail }) {
  const {
    status, to, from, quantity,
  } = orderDetail;
  const toState = state[to];
  const fromState = state[from];
  const classes = useListItemStyles();
  const getMessage = () => {
    if (status === orderStatuses.IN_TRANSIT) {
      return `An order of ${quantity} ventilators has been shipped from ${fromState} to ${toState}`;
    }
    if (status === orderStatuses.PENDING_SHIPMENT) {
      return `${fromState} has required ${quantity} ventilators from ${toState}`;
    }
    if (status === orderStatuses.PENDING_SHIPMENT) {
      return `${toState} has received ${quantity} ventilators from ${fromState}`;
    }
  };

  return (
    <Link to={`/state/${to}/orders`}>
      <ListItem
        button
        alignItems="flex-start"
      >
        <ListItemText
          classes={{
            primary: classes.listText,
          }}
          primary={getMessage()}
        />
      </ListItem>
    </Link>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100%',
    overflow: 'scroll',
    backgroundColor: '#191A1A',
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();
  const orders = useRecentOrders(10);

  return (
    <List
      style={{
        width: 'inherit',
      }}
      className={classes.root}
    >
      {orders.map(((orderDetail, key) => <OrderListItem key={key} orderDetail={orderDetail} />))}
    </List>
  );
}
