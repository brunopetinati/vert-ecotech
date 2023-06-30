import { render } from "@testing-library/react";
import App from "../App";

test('sum', () => {

  const { getByText } = render(App)

  expect(getByText('Esqueceu a senha?')).toBeTruthy()
})


/* describe('App Component', () => {
  it('should render list items', () => {
    const { getByText } = render(<App /> )
    expect(getByText('Diego')).toBeInTheDocument()
  });
}); */