import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import states from 'constants/state';
import useCurrentState from 'hooks/useCurrentState';
import { useHistory } from 'react-router-dom';

export default function() {
  const history = useHistory();
  const state = useCurrentState();
  return (
    <Autocomplete
      id='state-select'
      options={Object.keys(states)}
      getOptionLabel={option => states[option]}
      disableClearable
      style={{ width: 150 }}
      value={state[1]}
      renderInput={params => <TextField {...params} label='State' variant='standard' />}
      // onChange={selectedState => history.push(`/state/${selectedState}`)}
      onChange={(e, selectedState) => history.push(`/state/${selectedState}`)}
    />
  );
}
