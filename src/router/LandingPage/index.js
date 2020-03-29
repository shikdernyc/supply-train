import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'components/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import state from 'constants/state';
import Settings from './Settings';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

function StateSelector() {
  const classes = useStyles();
  const history = useHistory();

  const options = useMemo(() => Object.keys(state).map((stateKey) => ({
    code: stateKey,
    label: state[stateKey],
  })), []);

  const [selectedState, setSelectedState] = useState(options[0]);

  return (
    <div>
      <Autocomplete
        style={{ width: 300 }}
        options={options}
        classes={{
          option: classes.option,
        }}
        value={selectedState}
        onChange={(event, newValue) => {
          setSelectedState(newValue);
        }}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(option) => (
          <>
            {option.code}
            {' - '}
            {option.label}
          </>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose your state"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
            // autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
      <Button
        color="primary"
        onClick={() => {
          history.push(`/state/${selectedState.code}`);
        }}
      >
        Dashboard
      </Button>
    </div>
  );
}

function LandingPage() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100vh',
    }}
    >
      <h1>Hello Landing page</h1>
      <div>
        <Settings />
      </div>
      <div>
        <StateSelector />
      </div>
    </div>
  );
}

export default LandingPage;
