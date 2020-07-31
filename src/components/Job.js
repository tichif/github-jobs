import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap';

const Job = ({ job }) => {
  return (
    <Card>
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <div>
            <Card.Title>
              {job.title} -{' '}
              <span className='text-muted font-weight-light'>
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className='text-muted mb-2'>
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant='secondary' className='mr-2'>
              {job.type}
            </Badge>
            <Badge variant='info'>{job.location}</Badge>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

Job.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Job;
