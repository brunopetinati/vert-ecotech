
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
  if (score < 5) {
    return "red";
  } else if (score < 7) {
    return "orange";
  } else if (score < 13) {
    return "#054d00";
  } else {
    return "#7eff00";
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

export const transformNumbersToHectares = (value) => {
  const inputValue = typeof value === 'number' ? value.toString() : value;
  const formattedValue = Number(inputValue).toLocaleString('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formattedValue + ' ha';
};


export const regularMaskforNumbers = (event, onChangeFunction) => {
  const inputValue = event.target.value.replace(/\D/g, '');
  const formattedValue = Number(inputValue).toLocaleString('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  onChangeFunction(formattedValue);
};

export const extractNumbers = (num) => {
  const str = num.toString();
  if (str.length < 4) {
    return parseInt(str);
  }
  const withoutPoints = str.replace(/\./g, '');
  return parseInt(withoutPoints);
};

export const removeNonDigits = (phoneNumber) => {
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  return digitsOnly;
};

export const convertPhone = (phoneNumber) => {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

  const countryCode = cleanedPhoneNumber.slice(0, 2);
  const areaCode = cleanedPhoneNumber.slice(2, 3);
  const firstGroup = cleanedPhoneNumber.slice(3, 7);
  const secondGroup = cleanedPhoneNumber.slice(7, 11);

  const formattedPhoneNumber = `(${countryCode}) ${areaCode} ${firstGroup}-${secondGroup}`;

  return formattedPhoneNumber;
};