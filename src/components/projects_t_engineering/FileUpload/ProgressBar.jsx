import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

function ProgressBar({ data }) {
  const totalFiles = countFilledAllFiles(data);
  const filledFiles = countFilledFiles(data);
  const percentage = (filledFiles / totalFiles) * 100;

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      setWidth(percentage);
    };

    updateProgress();
  }, [percentage]);

  function countFilledFiles(data) {
    let count = 0;

    for (const topicKey in data) {
      const topic = data[topicKey];
      if (topic && topic.titulo && topic.titulo.fileName) {
        if (topic.questoes) {
          for (const questao of topic.questoes) {      
            if(questao.document_ativo) {
              count++;
            }
          }
        }
      }
    }

    return count;
  }

  function countFilledAllFiles(data) {
    let count = 0;

    for (const topicKey in data) {
      const topic = data[topicKey];
      if (topic && topic.titulo && topic.titulo.fileName) {
        if (topic.questoes) {
          for (const questao of topic.questoes) {      
            count++;
          }
        }
      }
    }

    return count;
  }  

  let colorClass = '';
  if (percentage <= 33.33) {
    colorClass = 'yellow';
  } else if (percentage <= 66.66) {
    colorClass = 'blue';
  } else {
    colorClass = 'green';
  }

  return (
    <div className="item-list-div" style={{ width: '800px', marginLeft: '0px' }}>
      <h4 style={{ color: 'black', fontSize: '11pt', width: '440px', float: 'left', marginTop: '15px', marginLeft: '20px' }}>
        Número de arquivos preenchidos: {filledFiles} de {totalFiles} ({percentage.toFixed(2)}%)
      </h4>    
      <div className="progress-bar-container" style={{ float: 'left' }}>
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
    </div>
  );
}

export default ProgressBar;
