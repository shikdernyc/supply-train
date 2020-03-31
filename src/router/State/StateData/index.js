import React from 'react';
import Grid from 'components/Grid';
import TotalVentilatorsCard from './TotalVentilatorsCard';
import CriticalCasesCard from './CriticalCasesCard';
import ProjectedCriticalCases from './ProjectedCasesCard';
import TotalCasesCard from './TotalCasesCard';
import NewCasesCard from './NewCasesCard';
import IncomingVentilatorsCard from './IncomingVentilatorsCard';
import ActiveCasesCard from './ActiveCasesCard';

function StateDataPage() {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <TotalVentilatorsCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <IncomingVentilatorsCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ProjectedCriticalCases />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <TotalCasesCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ActiveCasesCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CriticalCasesCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <NewCasesCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default StateDataPage;
