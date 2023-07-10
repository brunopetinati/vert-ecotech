import { render } from "@testing-library/react";
import Profile from "../../components/profile";
import { Provider } from "react-redux";
import store from "../../store";

describe('Profile', () => {
  it('should render successfully', () => {

    const user = {
      id: 1,
      full_name: 'Vert Desenvolvimento',
      rg: '47.859.555-4',
      cpf: '392.382.555-46' ,
      phone: '19 9 9727-9784',
      email: 'suporte@vertecotech.com',
      user_type: 'ADM',
      cep: '13140544',
      cnpj: '43.492,578/0001-40',
      street: 'Rua Lúcio Hipólito Rosa',
      number: '13',
      complement: '12A',
      district: 'Jardim Ipê',
      state: 'SP',
      city: 'Paulínia'
    }

    const { container } = render(<Provider store={store}><Profile user={user}/></Provider>);
    expect(container).toBeTruthy();
  });
});

