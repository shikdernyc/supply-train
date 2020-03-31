import React from 'react';
import Icon from '@material-ui/core/Icon';
import { useCurrentStateIncomingVentilators } from 'hooks/useCurrentStateData';
import DataCard from '../DataCard';

export default function () {
  const incomingVentilators = useCurrentStateIncomingVentilators();

  return (
    <DataCard
      title="IncomingVentilators"
      infoText="Number of ventilators that are currently coming from other states"
      Icon={<Icon>airline_seat_flat</Icon>}
      color="success"
      data={incomingVentilators}
    />
  );
}
