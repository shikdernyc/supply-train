import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import Button from 'components/Button';
import { makeStyles } from '@material-ui/core/styles';
import Input from 'components/Input';
import SettingsContext from 'contexts/Settings';
import useInputState from 'hooks/useInputState';


const useSettingsStyles = makeStyles({
  input: {
  },
  settingsContainer: {
    width: '300px',
    marginBottom: '30px',
  },
  title: {
    marginBottom: '0px',
    paddingBottom: '0px',
  },
});

export default function Settings() {
  const classes = useSettingsStyles();

  const {
    updateSettings,
    settings: {
      ventilatorToIcuPercentage,
      shipmentDelayInSec,
      criticalToTotalPercentage,
    },
  } = useContext(SettingsContext);

  const [ventilatorIcu, handleVentilatorIcuChange] = useInputState(ventilatorToIcuPercentage);
  const [shipmentDelaySec, handleShipmentDelaySec] = useInputState(shipmentDelayInSec);
  const [critPercentage, handleCritToTotal] = useInputState(criticalToTotalPercentage);

  const handleUpdateSettings = () => {
    const newSettings = {
      ventilatorToIcuPercentage: ventilatorIcu,
      shipmentDelayInSec: shipmentDelaySec,
      criticalToTotalPercentage: critPercentage,
    };

    updateSettings(newSettings);
  };

  return (
    <div>
      <Container className={classes.settingsContainer}>
        <h3 className={classes.title}>Settings</h3>
        <Input
          labelText="Ventialtor ICU Percentage"
          type="number"
          fullWidth
          value={ventilatorIcu}
          onChange={handleVentilatorIcuChange}
        />
        <Input
          labelText="Shipment Delay Sec"
          type="number"
          fullWidth
          value={shipmentDelaySec}
          onChange={handleShipmentDelaySec}
        />
        <Input
          labelText="Total to Critical Percentage"
          fullWidth
          type="number"
          value={critPercentage}
          onChange={handleCritToTotal}
        />
        <Button onClick={handleUpdateSettings}>Update</Button>
      </Container>
    </div>
  );
}
