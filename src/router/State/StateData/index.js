import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Warning from '@material-ui/icons/Warning';
// core components
import Grid from 'components/Grid';
import { Danger } from 'components/Typography';
import Card, { CardHeader, CardIcon, CardBody, CardFooter } from 'components/Card';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';
import {
  useCurrentStateTotalCases,
  useCurrentStateNewCases,
  useCurrentStateActiveCases,
  useCurrentStateCriticalCases,
  useCurrentStateVentilators,
  useCurrentStateIncomingVentilators
} from 'hooks/useCurrentStateData';
import Input from 'components/Input';
import Button from 'components/Button';
import useInputState from 'hooks/useInputState';
import TotalVentilatorsCard from './TotalVentilatorsCard';
import CriticalCasesCard from './CriticalCasesCard';
import TotalCasesCard from './TotalCasesCard';
import NewCasesCard from './NewCasesCard';
import IncomingVentilatorsCard from './IncomingVentilatorsCard';
import ActiveCasesCard from './ActiveCasesCard';

const useStyles = makeStyles({
  ...styles,
  cardFooter: { display: 'flex', justifyContent: 'flex-end', width: '100%', height: '80px' },
  cardInput: {}
});

function StateDataPage() {
  const classes = useStyles();
  const totalCases = useCurrentStateTotalCases();
  const newCases = useCurrentStateNewCases();
  const activeCases = useCurrentStateActiveCases();
  const incomingVentilators = useCurrentStateIncomingVentilators();

  const [ventilators, setVentilators] = useCurrentStateVentilators();
  const [criticalCases, setCriticalCases] = useCurrentStateCriticalCases();

  const [updatedCritical, handleUpdatedCriticalChange] = useInputState(criticalCases);
  const [updatedVentialtors, handleUpdateVentilators] = useInputState(ventilators);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <TotalVentilatorsCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CriticalCasesCard />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <TotalCasesCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <NewCasesCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActiveCasesCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <IncomingVentilatorsCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default StateDataPage;
