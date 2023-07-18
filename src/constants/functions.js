
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

export const formatCPF = (cpf) => {
  // Remove all non-digit characters from the CPF
  const cleanedCPF = cpf.replace(/\D/g, '');

  // Extract the first 11 digits
  const extractedDigits = cleanedCPF.slice(0, 11);

  // Split the digits into groups of 3, 3, and 2
  const firstGroup = extractedDigits.slice(0, 3);
  const secondGroup = extractedDigits.slice(3, 6);
  const thirdGroup = extractedDigits.slice(6, 9);
  const lastGroup = extractedDigits.slice(9, 11);

  // Construct the formatted CPF
  const formattedCPF = `${firstGroup}.${secondGroup}.${thirdGroup}-${lastGroup}`;

  return formattedCPF;
};

export const formatSICARCode = (inputString) => {
  //Remove any existing format characters
  const cleanedString = inputString.replace(/[\-\.]/g, '');

  // Check if the cleaned string already has the desired format
  if (cleanedString.length === 48) {
    return cleanedString.toUpperCase();
  }

  // Check if the cleaned string is incomplete
  if (cleanedString.length < 48) {
    const incompleteMessage = 'Código SICAR pode conter erro';
    const formattedString = `${cleanedString.toUpperCase()} - ${incompleteMessage.charAt(0)}${incompleteMessage.slice(1)}`;
    return formattedString;
  }

  // Split the cleaned string into groups
  const firstGroup = cleanedString.slice(0, 2);
  const secondGroup = cleanedString.slice(2, 9);
  const thirdGroup = cleanedString.slice(9, 13);
  const fourthGroup = cleanedString.slice(13, 17);
  const fifthGroup = cleanedString.slice(17, 21);
  const sixthGroup = cleanedString.slice(21, 25);
  const seventhGroup = cleanedString.slice(25, 29);
  const eighthGroup = cleanedString.slice(29, 33);
  const ninthGroup = cleanedString.slice(33, 37);
  const tenthGroup = cleanedString.slice(37, 41);

  // Construct the formatted string
  const formattedString = `${firstGroup}-${secondGroup}-${thirdGroup}.${fourthGroup}.${fifthGroup}.${sixthGroup}.${seventhGroup}.${eighthGroup}.${ninthGroup}.${tenthGroup}`;

  return formattedString.toUpperCase();
};
