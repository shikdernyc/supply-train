import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from 'components/Table';
import Card, { CardHeader, CardBody } from 'components/Card';
import useCurrentState from 'hooks/useCurrentState';
import useOrderActions from 'hooks/useOrderActions';
import { orderTypes } from 'constants/order';
import { orderStatuses, orderStatusActions } from '../../../../constants/order';
import Button from 'components/Button';
import ActionButton from './ActionButton';

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
  const { getOrdersInState } = useOrderActions();
  const orders = getOrdersInState(state).filter(order => order.status !== orderStatuses.COMPLETE);

  return (
    <Card>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>Current Orders</h4>
        <p className={classes.cardCategoryWhite}>Here is a subtitle for this table</p>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor='primary'
          tableHead={['Item', 'Order Type', 'From / To', 'Quantity', 'Expected By', 'Status', 'Action']}
          tableData={orders.map(order => [
            order.item,
            order.type,
            order.type === orderTypes.INCOMING ? order.from : order.to,
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
