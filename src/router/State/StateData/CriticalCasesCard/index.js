import React from 'react';
import Icon from '@material-ui/core/Icon';
import { useCurrentStateCriticalCases } from 'hooks/useCurrentStateData';
import Input from 'components/Input';
import Button from 'components/Button';
import useInputState from 'hooks/useInputState';
import DataCard from '../DataCard';

export default function () {
  const [criticalCases, setCriticalCases] = useCurrentStateCriticalCases();

  const [updatedCritical, handleUpdatedCriticalChange] = useInputState(criticalCases);

  return (
    <DataCard
      title="Critical Cases"
      infoText="Critical cases in the state. Updating this would update projected critical and determine weather new orders needs to be made"
      Icon={<Icon>person</Icon>}
      color="danger"
      data={criticalCases}
      Input={(
        <Input
          labelText="Update critical cases"
          type="number"
          value={updatedCritical}
          onChange={handleUpdatedCriticalChange}
        />
      )}
      Button={(
        <Button
          size="sm"
          onClick={() => {
            setCriticalCases(updatedCritical);
          }}
        >
          Update
        </Button>
      )}
    />
  );
}
