
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


//export const extractNumbers = (num) => {
//  const str = num.toString();
//  if (str.length < 4) {
//    return parseInt(str);
//  }
//  const withoutPoints = str.replace(/\./g, '');
//  return parseInt(withoutPoints);
//};

export const extractNumbers = (num) => {
  if (num == null) {
    return null;
  }

  const str = num.toString();
  if (str.length < 4) {
    return parseInt(str, 10) || null;
  }

  const withoutPoints = str.replace(/\./g, '');
  return parseInt(withoutPoints, 10) || null;
};

export const removeNonDigits = (phoneNumber) => {
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  return digitsOnly;
};

export const convertPhone = (phoneNumber) => {

  if (!phoneNumber) {
    return 'Telefone não cadastrado'
  }

  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

  const countryCode = cleanedPhoneNumber.slice(0, 2);
  const areaCode = cleanedPhoneNumber.slice(2, 3);
  const firstGroup = cleanedPhoneNumber.slice(3, 7);
  const secondGroup = cleanedPhoneNumber.slice(7, 11);

  const formattedPhoneNumber = `(${countryCode}) ${areaCode} ${firstGroup}-${secondGroup}`;

  return formattedPhoneNumber;
};

export const formatCPF = (cpf) => {

  if (!cpf) {return ''};

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

  if (!inputString) {return ''};

  // Remove any existing format characters
  const cleanedString = inputString.replace(/[\-\.]/g, '');

  // Check if the cleaned string already has the desired format
  if (cleanedString.length === 45) {
    return cleanedString.toUpperCase();
  }

  // Check if the cleaned string is incomplete
  if (cleanedString.length < 45) {
    const incompleteMessage = 'Código SICAR pode conter erro';
    const formattedString = `${cleanedString.slice(0, 2)}-${cleanedString.slice(2, 9)}-${cleanedString.slice(9, 13)}.${cleanedString.slice(13, 17)}.${cleanedString.slice(17, 21)}.${cleanedString.slice(21, 25)}.${cleanedString.slice(25, 29)}.${cleanedString.slice(29, 33)}.${cleanedString.slice(33, 37)}.${cleanedString.slice(37, 41)}`;
    return formattedString.toUpperCase();
  }

  // Construct the formatted string
  const formattedString = `${cleanedString.slice(0, 2)}-${cleanedString.slice(2, 9)}-${cleanedString.slice(9, 11)}.${cleanedString.slice(11, 15)}.${cleanedString.slice(15, 19)}.${cleanedString.slice(19, 23)}.${cleanedString.slice(23, 27)}.${cleanedString.slice(27, 31)}.${cleanedString.slice(31, 35)}.${cleanedString.slice(35, 39)}`;

  return formattedString.toUpperCase();
};

export const formatCEP = (cep) => {

  if (!cep) {return ''};

  const digitsOnly = cep.replace(/\D/g, '');

  if (digitsOnly.length !== 8) {
    throw new Error('Invalid CEP number. Expected 8 digits.');
  }

  const formattedCEP = `${digitsOnly.substr(0, 5)}-${digitsOnly.substr(5)}`;

  return formattedCEP;
};

export const getProposalStatusInfo = (acceptance) => {

  return { text: "", color: "" };

  //if (acceptance === true) {
  //  return { text: "Aceita", color: "black" }; // Green for "Aceita"
  //} else if (acceptance === false) {
  //  return { text: "Recusada", color: "black" }; // Red for "Recusada"
  //} else {
  //  return { text: "Pendente", color: "black" }; // Gray for "Pendente" original: #757575
  //}
};