import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

function ProgressBarFilho({ data, __topico }) {
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

  function countFilledAllFiles(data) {
    let count = 0;

    for (const topicKey in data) {
      const topic = data[topicKey];
      if (topic && topic.titulo && topic.titulo.fileName && topicKey == __topico) {
        if (topic.questoes) {
          for (const questao of topic.questoes) {      
            //if(questao.document_ativo) {
              count++;
            //}
          }
        }
      }
    }

    return count;
  }

  function countFilledFiles(data) {
    let count = 0;

    for (const topicKey in data) {
      const topic = data[topicKey];
      if (topic && topic.titulo && topic.titulo.fileName && topicKey == __topico) {
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

  let colorClass = '';
  if (percentage <= 33.33) {
    colorClass = 'yellow';
  } else if (percentage <= 66.66) {
    colorClass = 'blue';
  } else {
    colorClass = 'green';
  }

  return (
    <div> 
      <div className="progress-bar-container-filho">
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

export default ProgressBarFilho;
