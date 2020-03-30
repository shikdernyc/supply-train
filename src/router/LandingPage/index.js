import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from 'assets/img/reactlogo.png';
import dashboardStyles from 'assets/jss/material-dashboard-react/layouts/adminStyle';
import { Grid } from '@material-ui/core';
import state, { STATE_LOCATION } from 'constants/state';
import { APP_DISPLAY_NAME } from 'constants/app';
import Sidebar from './Sidebar';

import StateMap from './StateMap';

const useStyles = makeStyles((theme) => {
  const preStyles = dashboardStyles(theme);
  return ({
    ...preStyles,
    mainPanel: {
      ...preStyles.mainPanel,
      minHeight: '100%',
    },
    content: {
      marginTop: 0,
      paddingTop: 0,
      height: '100%',
    },
  });
});

const stateInfo = {};
Object.keys(state).forEach((stateKey) => {
  const stateLabel = state[stateKey];
  stateInfo[stateKey] = {
    label: stateLabel,
    latitude: STATE_LOCATION[stateLabel].latitude,
    longitude: STATE_LOCATION[stateLabel].longitude,
  };
});

function LandingPage() {
  const classes = useStyles();
  const [activeStateKey, setActiveStateKey] = useState(null);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        logoText={APP_DISPLAY_NAME}
        stateInfo={stateInfo}
        activeStateKey={activeStateKey}
        setActiveStateKey={setActiveStateKey}
        logo={logo}
        color="blue"
        bgColor="black"
        open={false}
      />
      <div className={classes.mainPanel}>
        <Grid
          container
          direction="column"
          alignItems="stretch"
        >
          <Grid
            container
            direction="row"
            style={{ height: '75vh' }}
            space={0}
            alignItems="stretch"
          >
            <Grid item xs={12}>
              <StateMap
                stateInfo={stateInfo}
                activeStateKey={activeStateKey}
                setActiveStateKey={setActiveStateKey}
              />
            </Grid>
            {/* <Grid item xs={3}>
              <h1>Info</h1>
            </Grid> */}
          </Grid>
          <Grid item style={{ height: '25vh', backgroundColor: 'gray' }}>
            <div>
              <h1>Recent Orders</h1>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default LandingPage;
