import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from 'components/Table';
import Card, { CardHeader, CardBody } from 'components/Card';
import useCurrentState from 'hooks/useCurrentState';
import { orderTypes } from 'constants/order';
import ActionButton from 'components/ActionButton';
import { useRecentStateOrders } from 'hooks/useOrders';
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

export default function(props) {
  const classes = useStyles();
  const state = useCurrentState();
  const orders = useRecentStateOrders(state, 5);

  return (
    <Card>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>Pending Actions</h4>
        <p className={classes.cardCategoryWhite}>These items need your attention</p>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor='primary'
          tableHead={['Item', 'Order Type', 'From / To', 'Quantity', 'Expected By', 'Status', 'Action']}
          tableData={orders.map(order => [
            order.item,
            getTransitType(state, order),
            getTransactionalState(state, order),
            order.quantity,
            `${order.expected_by[0].toLocaleDateString()} (${order.expected_by[1]} sec)`,
            order.status,
            <ActionButton order={order} />
          ])}
        />
      </CardBody>
    </Card>
  );
}
