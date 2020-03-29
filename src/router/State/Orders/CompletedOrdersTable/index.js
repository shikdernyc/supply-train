import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from 'components/Table';
import Card, { CardHeader, CardBody } from 'components/Card';
import useCurrentState from 'hooks/useCurrentState';
import useOrderActions from 'hooks/useOrderActions';
import { orderTypes } from 'constants/order';
import { orderStatuses } from 'constants/order';

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
  const orders = getOrdersInState(state).filter(order => order.status === orderStatuses.COMPLETE);

  return (
    <Card>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>Order History</h4>
        <p className={classes.cardCategoryWhite}>Your history of completed shipments</p>
      </CardHeader>
      <CardBody>
        <Table
          tableHeaderColor='primary'
          tableHead={['Item', 'Order Type', 'From / To', 'Quantity', 'Delivered On']}
          tableData={orders.map(order => [
            String(order.item),
            String(order.type),
            order.type === orderTypes.INCOMING ? order.from : order.to,
            String(order.quantity),
            order.expected_by[0].toLocaleDateString()
          ])}
        />
      </CardBody>
    </Card>
  );
}
