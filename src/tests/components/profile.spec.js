import { render, cleanup } from "@testing-library/react";
import Profile from "../../components/profile";
import { Provider } from "react-redux";
import store from '../mocks/store';

afterEach(() => { 
  cleanup();
});

describe('Profile', () => {
  it('renders successfully', () => {
    const { container } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});

