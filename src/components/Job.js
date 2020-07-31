import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const Job = ({ job }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className='mb-3'>
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
            <div style={{ wordBreak: 'break-all' }}>
              <ReactMarkdown children={job.how_to_apply} escapeHtml={false} />
            </div>
          </div>
          <img
            className='d-none d-md-block'
            height='50'
            src={job.company_logo}
            alt={job.company}
          />
        </div>
        <Card.Text>
          <Button onClick={() => setOpen(!open)} variant='primary'>
            {' '}
            {open ? 'Hide details' : 'View Details'}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className='mt-4'>
            <ReactMarkdown
              source={job.description}
              escapeHtml={false}
            ></ReactMarkdown>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

Job.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Job;
