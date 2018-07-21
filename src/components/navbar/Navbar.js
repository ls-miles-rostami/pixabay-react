import React from 'react';
import logo from '../../assets/Broadsign_Logo.svg';

export default () => {
  return (
    <div className="nav">
      <div className="nav-header">
        <div className="nav-title">
          <span>
            <img className="logo" src={logo} alt="Broadsign Logo" />
          </span>
          Coding Challenge
        </div>
      </div>
      <input type="checkbox" id="nav-check" />
      <div className="nav-links">
        <a href="https://github.com/milesros/pixabay-react" rel="noopener noreferrer" target="_blank">
          GitHub
        </a>
      </div>
    </div>
  );
};
