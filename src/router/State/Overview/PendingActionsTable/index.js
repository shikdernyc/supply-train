import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from 'components/Table';
import Card, { CardHeader, CardBody } from 'components/Card';
import useCurrentState from 'hooks/useCurrentState';
import ActionButton from 'components/ActionButton';
import { useRecentPendingStateOrders } from 'hooks/useOrders';
import { getTransitType } from 'utils/order/getPerspectiveProps';
import { getTransactionalState } from 'utils/order/getPerspectiveProps';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  }
};

const useStyles = makeStyles(styles);

export default function() {
  const classes = useStyles();
  const state = useCurrentState();
  const orders = useRecentPendingStateOrders(state);

  return (
    <Card>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>Pending Actions</h4>
        <p className={classes.cardCategoryWhite}>These items need your attention</p>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor='primary'
          tableHead={[
            { title: 'Item', field: 'item' },
            { title: 'Order Type', field: 'type' },
            { title: 'From / To', field: 'from_to' },
            { title: 'Quantity', field: 'quantity' },
            { title: 'Expected By', field: 'expected_by' },
            { title: 'Status', field: 'status' },
            { title: 'Action', field: 'action', sorting: false }
          ]}
          tableData={orders.map(order => ({
            ...order,
            type: getTransitType(state, order),
            from_to: getTransactionalState(state, order),
            expected_by: `${order.expected_by[0].toLocaleDateString()} (${order.expected_by[1]} sec)`,
            action: <ActionButton order={order} />
          }))}
        />
      </CardBody>
    </Card>
  );
}
