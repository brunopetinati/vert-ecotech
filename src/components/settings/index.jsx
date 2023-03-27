import ToggleSwitch from '../default_toggle';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLayout } from '../../store/modules/settings/actions';


const Settings = () => {

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const layout = useSelector((state) => state.layout.cardsLayout);


  useEffect(()=> {
    if (layout){
      setIsChecked(layout);
    }
  }, [layout]);


  const handleChange = () => {
    setIsChecked(!isChecked);

    if (isChecked) {
      dispatch(toggleLayout(true));
    } else {
      dispatch(toggleLayout(false));
    };

  };

  return (
    <>
      <ToggleSwitch label={"Visualizar projetos em cards"} checked={layout} onChange={handleChange}/>
    </>
  );
};

export default Settings;
