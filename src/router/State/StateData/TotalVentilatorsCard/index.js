import React from 'react';
import Icon from '@material-ui/core/Icon';
import { useCurrentStateVentilators } from 'hooks/useCurrentStateData';
import Input from 'components/Input';
import Button from 'components/Button';
import useInputState from 'hooks/useInputState';
import DataCard from '../DataCard';

export default function () {
  const [ventilators, setVentilators] = useCurrentStateVentilators();

  const [updatedVentialtors, handleUpdateVentilators] = useInputState(ventilators);

  return (
    <DataCard
      title="Total Ventilators"
      infoText="Number of ventilators the state current has available"
      Icon={<Icon>airline_seat_flat</Icon>}
      color="info"
      data={ventilators}
      Input={(
        <Input
          labelText="Update total ventilators"
          type="number"
          value={updatedVentialtors}
          onChange={handleUpdateVentilators}
        />
      )}
      Button={(
        <Button
          size="sm"
          onClick={() => {
            setVentilators(updatedVentialtors);
          }}
        >
          Update
        </Button>
      )}
    />
  );
}
