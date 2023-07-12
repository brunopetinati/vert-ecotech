import Chart from "../../components/chart";
import { render, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from '../mocks/store';

afterEach(() => { 
  cleanup();
});

describe('Chart', () => {
  it('renders successfully', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Chart />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});
