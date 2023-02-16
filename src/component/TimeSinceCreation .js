import React from 'react';
import moment from 'moment';

const TimeSinceCreation = ({createdAt}) => {
  const now = moment();
  const created = moment(createdAt);
  const duration = moment.duration(now.diff(created));
  
  let result;

  if (duration.asSeconds() < 60) {
    result = `${duration.asSeconds().toFixed(0)} seconds ago`;
    } else if (duration.asMinutes() < 60) {
    result = `${duration.asMinutes().toFixed(0)} minutes ago`;
  } else if (duration.asHours() < 24) {
    result = `${duration.asHours().toFixed(0)} hours ago`;
  } else if (duration.asDays() < 30) {
    result = `${duration.asDays().toFixed(0)} days ago`;
  } else if (duration.asMonths() < 12) {
    result = `${duration.asMonths().toFixed(0)} months ago`;
  } else {
    result = `${duration.asYears().toFixed(0)} years ago`;
  }

  return <>{result}</>;
};

export default TimeSinceCreation;
