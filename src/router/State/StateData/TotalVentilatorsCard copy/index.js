import React from 'react';
import Icon from '@material-ui/core/Icon';
import { useCurrentStateVentilators } from './node_modules/hooks/useCurrentStateData';
import Input from './node_modules/components/Input';
import Button from './node_modules/components/Button';
import useInputState from './node_modules/hooks/useInputState';
import DataCard from '../DataCard';

export default function() {
  const [ventilators, setVentilators] = useCurrentStateVentilators();

  const [updatedVentialtors, handleUpdateVentilators] = useInputState(ventilators);

  return (
    <DataCard
      title='Total Ventilators'
      Icon={<Icon>content_copy</Icon>}
      color='warning'
      data={ventilators}
      Input={
        <Input
          labelText='Update total ventilators'
          type='number'
          value={updatedVentialtors}
          onChange={handleUpdateVentilators}
        />
      }
      Button={
        <Button
          size='sm'
          onClick={() => {
            setVentilators(updatedVentialtors);
          }}
        >
          Update
        </Button>
      }
    />
  );
}
