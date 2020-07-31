import React, { useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';

import useFetchJobs from './useFetchJobs';
import Job from './components/Job';

const App = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error } = useFetchJobs(params, page);

  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try refreshing....</h1>}
      {jobs.map((job) => (
        <Job key={job.id} job={job}></Job>
      ))}
    </Container>
  );
};

export default App;
