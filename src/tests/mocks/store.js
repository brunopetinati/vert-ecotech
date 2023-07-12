import configureStore from 'redux-mock-store';

// Create a mock Redux store
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
});