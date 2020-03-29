import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import state from 'constants/state';

const CurrentStateContext = createContext();

export function CurrentStateProvider({ stateKey, children }) {
  return (
    <CurrentStateContext.Provider
      value={{
        stateKey,
        currentState: state[stateKey],
      }}
    >
      {children}
    </CurrentStateContext.Provider>
  );
}

CurrentStateProvider.propTypes = {
  stateKey: PropTypes.oneOf(Object.keys(state)).isRequired,
  children: PropTypes.node.isRequired,
};

export default CurrentStateContext;
