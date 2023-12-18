import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  factoryArtifacts,
  factoryArtifactslvl2,
  factoryArtifactslvl3,
  factoryArtifactslvl4,
  factoryArtifactslvl5,
  factoryArtifactslvl6,
  factoryArtifactslvl7,
  factoryArtifactslvl8,
  factoryArtifactslvl9,
  factoryArtifactslvl10,
  factoryArtifactslvl11,
  factoryArtifactslvl12,
  factoryArtifactslvl13,
  factoryArtifactslvl14,
  factoryArtifactslvl15,
} from '../config/artifacts'; // Asegúrate de importar todos los artifacts correctamente

const useFactory = () => {
  const { active, library, chainId } = useWeb3React();

  const factories = [
    factoryArtifacts,
    factoryArtifactslvl2,
    factoryArtifactslvl3,
    factoryArtifactslvl4,
    factoryArtifactslvl5,
    factoryArtifactslvl6,
    factoryArtifactslvl7,
    factoryArtifactslvl8,
    factoryArtifactslvl9,
    factoryArtifactslvl10,
    factoryArtifactslvl11,
    factoryArtifactslvl12,
    factoryArtifactslvl13,
    factoryArtifactslvl14,
    factoryArtifactslvl15,
  ]; // Coloca todos los objetos de los artifacts en un array

  const FactoryProjects = useMemo(() => {
    if (active && library && chainId !== undefined && library.eth && library.eth.Contract) {
      const currentFactory = factories[chainId]; // Suponiendo que el chainId corresponde al índice en el array
      if (currentFactory) {
        return new library.eth.Contract(currentFactory.abi, currentFactory.address[chainId]);
      }
    }
    return null;
  }, [active, chainId, library]);

  return FactoryProjects;
};

export default useFactory;


/*
import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import {factoryArtifacts} from '../config/artifacts/factoryArtifacts'
import {factoryArtifactslvl2} from '../config/artifacts/factoryArtifactslvl2'
import {factoryArtifactslvl3} from '../config/artifacts/factoryArtifactslvl3'
import {factoryArtifactslvl4} from '../config/artifacts/factoryArtifactslvl4'
import {factoryArtifactslvl5} from '../config/artifacts/factoryArtifactslvl5'
import {factoryArtifactslvl6} from '../config/artifacts/factoryArtifactslvl6'
import {factoryArtifactslvl7} from '../config/artifacts/factoryArtifactslvl7'
import {factoryArtifactslvl8} from '../config/artifacts/factoryArtifactslvl8'

const { address, abi} = factoryArtifacts;


const useFactory = () => {
  const { active, library, chainId } = useWeb3React();
  
  const FactoryProjects = useMemo (() => { 
    if (active) new library.eth.Contract(abi, address[chainId]);
    }, [active, chainId, library?.eth?.Contract]); 

    return FactoryProjects;

};

export default useFactory;
*/