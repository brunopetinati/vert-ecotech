import DefaultButton from "../../components/default_button";
import { render, cleanup } from "@testing-library/react";
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from '../mocks/store';

afterEach(() => { 
  cleanup();
});

describe('DefaultButton', () => {
  it('renders successfully', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DefaultButton />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});

test('matches snapshot', () => {
  const tree = renderer.create(<Provider store={store}>
    <BrowserRouter>
      <DefaultButton />
    </BrowserRouter>
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
})