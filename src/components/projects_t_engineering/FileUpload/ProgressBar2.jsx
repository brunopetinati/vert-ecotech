import React, { useState, useEffect } from 'react';
import ProgressBarFilho from './ProgressBarFilho';

function ProgressBar2({ data, __topico }) {

  useEffect(() => {
  }, [data, __topico]);

  return (
    <div style={{ float: 'left', width: '150px', height: '20px' }} >
      {__topico.includes('01') && <ProgressBarFilho data={data} __topico={"01"} />}
      {__topico.includes('02') && <ProgressBarFilho data={data} __topico={"02"} />}
      {__topico.includes('03') && <ProgressBarFilho data={data} __topico={"03"} />}
      {__topico.includes('04') && <ProgressBarFilho data={data} __topico={"04"} />}
      {__topico.includes('05') && <ProgressBarFilho data={data} __topico={"05"} />}
      {__topico.includes('06') && <ProgressBarFilho data={data} __topico={"06"} />}
      {__topico.includes('07') && <ProgressBarFilho data={data} __topico={"07"} />}
      {__topico.includes('08') && <ProgressBarFilho data={data} __topico={"08"} />}
    </div>
  );
}

export default ProgressBar2;
