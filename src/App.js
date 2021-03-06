import React, { useState } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';

import useFetchJobs from './useFetchJobs';
import Job from './components/Job';
import JobPagination from './components/JobPagination';

const App = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  return (
    <Container className='my-4'>
      <JobPagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      ></JobPagination>
      <h1 className='mb-4'>Github Jobs</h1>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try refreshing....</h1>}
      {jobs.map((job) => (
        <Job key={job.id} job={job}></Job>
      ))}
      <JobPagination
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      ></JobPagination>
    </Container>
  );
};

export default App;
