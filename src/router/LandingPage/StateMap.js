import React, { useMemo } from 'react';
import Map, { Marker } from 'components/Map';
import { Popup } from 'react-map-gl';
import state from 'constants/state';
import useStateData from 'hooks/useStateData';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

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
    <div>
      <h3>{stateName}</h3>
      <p>
        Total Cases:
        {totalCases}
      </p>
      <p>
        Critical Cases:
        {criticalCases}
      </p>
      <p>
        Ventilators:
        {ventilators}
      </p>
      <p>
        Incoming Ventilators:
        {incomingVentilators}
      </p>
      <Button
        color="info"
        onClick={() => {
          history.push(`/state/${stateKey}`);
        }}
      >
        More Info
      </Button>
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
        tipSize={5}
        anchor="top"
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
