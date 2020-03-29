import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import state from 'constants/state';

const CurrentStateContext = createContext();

export function CurrentStateProvider({ currentState, children }) {
  return (
    <CurrentStateContext.Provider
      value={{
        currentState,
      }}
    >
      {children}
    </CurrentStateContext.Provider>
  );
}

CurrentStateProvider.propTypes = {
  currentState: PropTypes.oneOf(Object.keys(state)).isRequired,
  children: PropTypes.node.isRequired,
};

export default CurrentStateContext;
