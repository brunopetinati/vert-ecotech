import React from 'react';
import { SwitchLabel, SwitchInput, SwitchSlider, SwitchWrapper } from './styles'

const DefaultToggle = ({ label, checked, onChange }) => {


  return (
    <SwitchWrapper>
      <SwitchLabel>{label}</SwitchLabel>
      <SwitchInput checked={checked} onChange={onChange} />
      <SwitchSlider />
    </SwitchWrapper>
  );
};

export default DefaultToggle;