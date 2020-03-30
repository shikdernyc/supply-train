import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';

// TODO: MOVE TO ENV
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2hpa2Rlcm55YyIsImEiOiJjazhjOXIyY3cwZWk1M2VxZWl0cGE1bGFxIn0.Mcs3IQfBRDok0a1BNdOrlg';

// const fullscreenControlStyle = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   padding: '10px',
// };

// const navStyle = {
//   position: 'absolute',
//   top: 36,
//   left: 0,
//   padding: '10px',
// };

// const scaleControlStyle = {
//   position: 'absolute',
//   bottom: 36,
//   left: 0,
//   padding: '10px',
// };

const defaultViewport = {
  latitude: 37.785164,
  longitude: -100,
  zoom: 3.5,
  bearing: 0,
  pitch: 0,
};

function Map({ children }) {
  const [viewport, setViewport] = useState(defaultViewport);

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      {children}
      {/* <div style={fullscreenControlStyle}>
        <FullscreenControl />
      </div>
      <div style={navStyle}>
        <NavigationControl />
      </div>
      <div style={scaleControlStyle}>
        <ScaleControl />
      </div> */}
    </MapGL>
  );
}

Map.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Map;
