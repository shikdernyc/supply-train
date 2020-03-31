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
      Icon={<Icon>airline_seat_flat</Icon>}
      color="danger"
      data={projected}
    />
  );
}
