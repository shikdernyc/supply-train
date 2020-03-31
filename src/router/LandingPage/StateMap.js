import React, { useMemo } from 'react';
import Map, { Marker } from 'components/Map';
import { Popup } from 'react-map-gl';
import state from 'constants/state';
import useStateData from 'hooks/useStateData';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  stateDataTitle: {
    textAlign: 'left',
  },
  stateDataCount: {
    textAlign: 'right',
  },
});

const StateData = ({ title, count }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={8}>
        <p className={classes.stateDataTitle}>
          {title}
        </p>
      </Grid>
      <Grid item xs={4}>
        <p className={classes.stateDataCount}>
          {count}
        </p>
      </Grid>
    </>
  );
};

const PinInfo = ({
  stateKey,
}) => {
  const stateName = state[stateKey];
  const {
    totalCases,
    criticalCases,
    ventilators,
    incomingVentilators,
  } = useStateData(stateName);
  const history = useHistory();

  return (
  // <div style={{}}>
    <div style={{ maxWidth: '250px' }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <h3 style={{ textAlign: 'right' }}>{stateName}</h3>
        </Grid>
        <StateData title="Total Cases" count={totalCases} />
        <StateData title="Critical Cases" count={criticalCases} />
        <StateData title="Total Ventilators" count={ventilators} />
        <StateData title="Incoming Ventilators" count={incomingVentilators || 0} />
        <Grid item xs={12}>
          <Button
            fullWidth
            color="info"
            onClick={() => {
              history.push(`/state/${stateKey}`);
            }}
          >
            More Info
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

PinInfo.propTypes = {
  stateKey: PropTypes.string.isRequired,
};

function StateMap({
  activeStateKey,
  setActiveStateKey,
  stateInfo,
}) {
  const pinPopup = useMemo(() => {
    if (activeStateKey === null) return <></>;
    const pinInfo = stateInfo[activeStateKey];
    return ((
      <Popup
        // tipSize={5}
        anchor="top-left"
        longitude={pinInfo.longitude}
        latitude={pinInfo.latitude}
        closeOnClick={false}
        onClose={() => {
          setActiveStateKey(null);
        }}
      >
        <PinInfo stateKey={activeStateKey} />
      </Popup>
    )
    );
    // eslint-disable-next-line
  }, [activeStateKey]);

  const markers = useMemo(() => Object.keys(stateInfo).map((stateKey) => {
    const { latitude, longitude } = stateInfo[stateKey];
    return (
      <Marker
        key={stateKey}
        latitude={latitude}
        longitude={longitude}
        onClick={() => {
          setActiveStateKey(stateKey);
        }}
      />
    );
    // eslint-disable-next-line
  }), [stateInfo, setActiveStateKey, stateInfo]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
    }}
    >
      <Map>
        {markers}
        {pinPopup}
      </Map>
    </div>
  );
}

StateMap.propTypes = {
  stateInfo: PropTypes.object.isRequired,
  activeStateKey: PropTypes.string.isRequired,
  setActiveStateKey: PropTypes.func.isRequired,
};

export default StateMap;
