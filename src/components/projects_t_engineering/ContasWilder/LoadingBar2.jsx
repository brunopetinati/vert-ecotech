import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './LoadingBar2.css';

const LoadingBar = forwardRef(({ totalFiles }, ref) => {
  const [width, setWidth] = useState(0);

  useImperativeHandle(ref, () => ({
    updatePercentage: (percentage) => {
      setWidth(percentage);
    }
  }));

  useEffect(() => {
    const updateProgress = () => {
      setWidth((prevWidth) => Math.min(prevWidth + 1, 100));
    };

    const intervalId = setInterval(updateProgress, 100);

    return () => clearInterval(intervalId);
  }, []);

  let colorClass = '';
  if (width <= 33.33) {
    colorClass = 'yellow';
  } else if (width <= 66.66) {
    colorClass = 'blue';
  } else {
    colorClass = 'green';
  }

  return (
    <div className="progress-bar-container" style={{ width: '160px', marginLeft: '0px' }}>
      <div className="progress-bar">
        <div className={`progress-bar-fill ${colorClass}`} style={{ width: `${width}%` }}>
          {width > -1 && (
            <span style={{ color: 'black', fontSize: '9pt' }}>
              {width.toFixed(2)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default LoadingBar;
