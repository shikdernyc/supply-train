import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SettingsContext = createContext();

const defaultSettings = {
  ventilatorToIcuPercentage: 0.3,
  shipmentDelayInSec: 20,
  criticalToTotalPercentage: 0.1,
  projectedTimeline: 2,
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);

  const resetSettingSubscriber = new Set();
  const onSettingChange = (fn) => resetSettingSubscriber.add(fn);
  const removeOnSettingChange = (fn) => {
    resetSettingSubscriber.delete(fn);
  };

  useEffect(() => {
    // NOTIFY SUBSCRIBERS
    Array.from(resetSettingSubscriber).forEach((subscriber) => subscriber(settings));
    // eslint-disable-next-line
  }, [settings]);

  const updateSettings = (newSettings) => {
    const updatedSettings = {
      ...defaultSettings,
      ...newSettings,
    };
    setSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      onSettingChange,
      removeOnSettingChange,
    }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SettingsContext;
