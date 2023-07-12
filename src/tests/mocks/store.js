import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({
  app_data: {
    user_first_access: {
      id: 1,
      full_name: 'Vert Desenvolvimento',
      rg: '55.555.555-4',
      cpf: '555.555.555-46',
      phone: '19 9 9727-9784',
      email: 'suporte@vertecotech.com',
      user_type: 'ADM',
      cep: '13140000',
      cnpj: '55.555,555/0001-40',
      street: 'Rua Almeida Aparecida',
      number: '15',
      complement: '12A',
      district: 'Jardim Ipê',
      state: 'SP',
      city: 'Campinas',
      accept_terms_of_use: true,
      accept_privacy_politics: true
    },
  },
  user: {
    currentUser: {
      id: 1,
      full_name: 'Vert Desenvolvimento',
      rg: '99.999.999-9',
      cpf: '999.999.999.99',
      phone: '19999999999',
      email: 'suporte@vertecotech.com',
      user_type: 'ADM',
      cep: '13104500',
      cnpj: '43.492,578/0001-40',
      street: 'Rua dos Amarais',
      number: '13',
      complement: '12A',
      district: 'Jardim Ipê',
      state: 'SP',
      city: 'Paulínia',
      accept_terms_of_use: true,
      accept_privacy_politics: true
    },
  },
});

export default store;