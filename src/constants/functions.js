
export const getStatusCARColor = (status) => {
  switch (status) {
    case 'Ativo':
      return 'green';
    case 'Pendente':
      return 'orange';
    case 'Cancelado':
    case 'Não possui CAR':
      return 'red';
    default:
      return 'black';
  }
};

export const getStatusMatriculaColor = (status) => {
  switch (status) {
    case 'Vigente':
      return 'green';
    case 'Em atualização':
      return 'orange';
    case 'Cancelada':
      return 'red';
    default:
      return 'black';
  }
};

export const getScoreColor = (score) => {
  if (score < 4) {
    return "red";
  } else if (score < 7) {
    return "orange";
  } else {
    return "green";
  }
}

export const returnYesorNoforBoolean = (boolean) => {
  if(boolean) {
    return 'Sim'
  } else {
    return 'Não'
  }
};

export const returnUserName = (id, users) => {
  const user = users.find(user => user.id === id);
  return user ? user.full_name : '';
};
