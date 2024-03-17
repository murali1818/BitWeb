import React from 'react';
import './NotReady.css'; // Import CSS file for styling

const NotReady = () => {
  return (
    <div className="not-ready-container">
      <div className="not-ready-content">
        <h1>Page Not Yet Ready</h1>
        <p>Please check back later for updates</p>
        <div className="loader"></div> {/* Animation */}
        
      </div>
    </div>
  );
}

export default NotReady;
