import React from 'react';
import Icon from '@material-ui/core/Icon';
import { useCurrentStateProjectedCritical } from 'hooks/useCurrentStateData';
import useSettings from 'hooks/useSettings';
import DataCard from '../DataCard';

export default function () {
  const projected = useCurrentStateProjectedCritical();
  const { projectedTimeline } = useSettings();

  return (
    <DataCard
      title={`Projected Critical - ${projectedTimeline} Days`}
      infoText="Critical Cases we are expecting. This is used to determine weather state needs new shipments"
      Icon={<Icon>airline_seat_flat</Icon>}
      color="danger"
      data={projected}
    />
  );
}
