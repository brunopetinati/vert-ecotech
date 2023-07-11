import { render, cleanup } from "@testing-library/react";
import Profile from "../../components/profile";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';

afterEach(() => { 
  cleanup();
});

// Create a mock Redux store
const mockStore = configureStore([]);
const store = mockStore({
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
    },
  },
});

describe('Profile', () => {
  it('should render successfully', () => {
    const { container } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});

