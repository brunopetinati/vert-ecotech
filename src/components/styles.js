export const stylesPgMenuInf = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '150px',  // Ajuste a altura em pixels
    width: '80%',  // Ajuste a largura em pixels ou porcentagem
    //margin: '20px auto', // Margem superior e inferior de 20px, centralizando horizontalmente
    //marginLeft: '30px',  // Margem à esquerda
    //marginRight: '30px', // Margem à direita
    //backgroundColor: 'red', // Cor de fundo

    // Move o elemento (substitua os valores conforme necessário)
    position: 'relative', // Necessário para mover com top, bottom, left, right
    top: '250px',  // Move para cima (valores positivos movem para baixo)
    left: '325px',  // Move para a direita (valores negativos movem para a esquerda)
    
    // Alternativa usando transform:
    // transform: 'translate(10px, -20px)', // X (direita/esquerda), Y (cima/baixo)
  },
};


