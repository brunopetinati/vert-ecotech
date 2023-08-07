import { render, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AcceptanceBar from "../../components/acceptance_terms_footer";
import store from '../mocks/store';

afterEach(() => { 
  cleanup();
});

describe('AcceptanceBar', () => {
  it('renders successfully', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AcceptanceBar />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});

test('matches snapshot', () => {
  const tree = renderer.create(<Provider store={store}>
    <BrowserRouter>
      <AcceptanceBar />
    </BrowserRouter>
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
})