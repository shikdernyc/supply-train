import React from 'react';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
import Warning from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
// core components
import Grid from 'components/Grid';
import Table from 'components/Table';
import Tasks from 'components/Tasks';
import CustomTabs from 'components/Tabs';
import { Danger, Info } from 'components/Typography';
import Card, { CardHeader, CardIcon, CardBody, CardFooter } from 'components/Card';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

import { dailySalesChart, emailsSubscriptionChart, completedTasksChart } from './charts';
import PendingActionsTable from './PendingActionsTable';
import { OrderProvider } from 'contexts/Order';

const bugs = [
  'Sign contract for "What are conference organizers afraid of?"',
  'Lines From Great Russian Literature? Or E-mails From My Boss?',
  'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
  'Create 4 Invisible User Experiences you Never Knew About'
];
const website = [
  'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
  'Sign contract for "What are conference organizers afraid of?"'
];
const server = [
  'Lines From Great Russian Literature? Or E-mails From My Boss?',
  'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
  'Sign contract for "What are conference organizers afraid of?"'
];

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='warning' stats icon>
              <CardIcon color='warning'>
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Cases</p>
              <h3 className={classes.cardTitle}>8000</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='success' stats icon>
              <CardIcon color='success'>
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Active Cases</p>
              <h3 className={classes.cardTitle}>4,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='danger' stats icon>
              <CardIcon color='danger'>
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>New Cases</p>
              <h3 className={classes.cardTitle}>100</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  Up 10%
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='info' stats icon>
              <CardIcon color='info'>
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Supplies Sent</p>
              <h3 className={classes.cardTitle}>4500</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Info>
                  <InfoIcon />
                </Info>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  Including yet to be delivered
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color='success'>
              <ChartistGraph
                className='ct-chart'
                data={dailySalesChart.data}
                type='Line'
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{' '}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color='warning'>
              <ChartistGraph
                className='ct-chart'
                data={emailsSubscriptionChart.data}
                type='Bar'
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color='danger'>
              <ChartistGraph
                className='ct-chart'
                data={completedTasksChart.data}
                type='Line'
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <OrderProvider>
            <PendingActionsTable />
          </OrderProvider>
        </Grid>
      </Grid>
    </div>
  );
}
