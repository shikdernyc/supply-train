import React from 'react';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Warning from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import DateRange from '@material-ui/icons/DateRange';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
// core components
import Grid from 'components/Grid';
import { Danger, Info } from 'components/Typography';
import Card, {
  CardHeader, CardIcon, CardBody, CardFooter,
} from 'components/Card';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

import { dailySalesChart, emailsSubscriptionChart, completedTasksChart } from './charts';
import PendingActionsTable from './PendingActionsTable';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>person</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Cases</p>
              <h3 className={classes.cardTitle}>8000</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Up 4%
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>person</Icon>
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
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>group_add</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>New Cases</p>
              <h3 className={classes.cardTitle}>100</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Up 10%
                </a>
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>assignment_late</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Supplies Sent</p>
              <h3 className={classes.cardTitle}>4500</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Info>
                  <InfoIcon />
                </Info>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
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
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Supplies Sent</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} />
                  {' '}
                  55%
                </span>
                {' '}
                increase in supply traffic.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
                {' '}
                updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>New Cases</h4>
              <p className={classes.cardCategory}>Projected based on rate of growth</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <DateRange />
                {' '}
                For current 12 month period
              </div>
            </CardFooter>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Delivery Schedule</h4>
              <p className={classes.cardCategory}>Incoming and outgoing shipments</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
                {' '}
                For the next 56hrs
              </div>
            </CardFooter>
          </Card>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <PendingActionsTable />
        </Grid>
      </Grid>
    </div>
  );
}
