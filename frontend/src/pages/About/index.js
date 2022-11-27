import React from 'react';
import './styles.scss';

import TableNext from '../../components/TableNext';

const About = () => {
  return (
    <div className="about-page">
      <div className="title">About us</div>

      <div className="content">
        <TableNext />
      </div>
    </div>
  );
};

export default About;
