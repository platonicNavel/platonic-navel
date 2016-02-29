import React from 'react';

const Landing = () => {
  return (
    <div className="container">
      <div className="row button-row">
        <div className="col-xs-4 col-xs-offset-1 btn btn-info">
        <div className="dummy">Board a Train</div>
          <img className="people" src="assets/people.png" />
          <img className="train" src="assets/train.png" />
          <div className="destinations-text">Join your friends on fun outings</div>
        </div>
        <div className="col-xs-4 col-xs-offset-2 btn btn-info">
          <div className="dummy">Schedule a Train</div>
          <img className="calendar" src="assets/calendar.png" />
          <img className="location" src="assets/location.png" />
          <div className="trains-test">Organize trips to new places or old favorites</div>
        </div>
      </div>
    </div>
  )
}

export default Landing