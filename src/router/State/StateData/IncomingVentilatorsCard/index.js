import React from 'react';
import Icon from '@material-ui/core/Icon';
import { useCurrentStateIncomingVentilators } from 'hooks/useCurrentStateData';
import Input from 'components/Input';
import Button from 'components/Button';
import useInputState from 'hooks/useInputState';
import DataCard from '../DataCard';

export default function() {
  const incomingVentilators = useCurrentStateIncomingVentilators();

  return (
    <DataCard
      title='IncomingVentilators'
      Icon={<Icon>airline_seat_flat</Icon>}
      color='success'
      data={incomingVentilators}
    />
  );
}
