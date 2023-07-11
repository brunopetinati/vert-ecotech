import { render, cleanup } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

afterEach(() => { 
  cleanup();
});

describe('App', () => {
  it('should render successfully', () => {
    
    const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>);

    expect(container).toBeTruthy();
  });
});
