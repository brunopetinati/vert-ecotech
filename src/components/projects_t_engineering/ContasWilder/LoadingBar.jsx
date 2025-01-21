import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './LoadingBar.css';

const LoadingBar = forwardRef(({ totalFiles }, ref) => {
  const [percentage, setPercentage] = useState(0);

  useImperativeHandle(ref, () => ({
    updatePercentage(filledFiles) {
      setPercentage((filledFiles / totalFiles) * 100);
    }
  }));

  let colorClass = '';
  if (percentage <= 33.33) {
    colorClass = 'yellow';
  } else if (percentage <= 66.66) {
    colorClass = 'blue';
  } else {
    colorClass = 'green';
  }

  return (
    <div className="item-list-div" style={{ width: '690px', marginLeft: '0px' }}>
      <h4 style={{ color: 'black', fontSize: '11pt', width: '300px', float: 'left', marginTop: '15px', marginLeft: '20px' }}>
        Carregando arquivos: {percentage.toFixed(2)}%
      </h4>    
      <div className="progress-bar-container" style={{ float: 'left' }}>
        <div className="progress-bar">
          <div className={`progress-bar-fill ${colorClass}`} style={{ width: `${percentage}%` }}>
            {percentage > -1 && (
              <span style={{ color: 'black', fontSize: '9pt' }}>
                {percentage.toFixed(2)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default LoadingBar;
