import { render } from "@testing-library/react";
import Profile from "../../components/profile";
import { Provider } from "react-redux";
import store from "../../store";

describe('Profile', () => {
  it('should render successfully', () => {
    const { container } = render(<Provider store={store}><Profile /></Provider>);
    expect(container).toBeTruthy();
  });
});

