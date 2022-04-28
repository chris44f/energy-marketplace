import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Counter } from "../Counter";

describe('rendering', () => {
  let component;

  beforeEach(() => {
    component = render(<Counter handleValueChange={jest.fn} value={1}/>)
  })

  it("renders increase and decrease buttons", async () => {
    const { getByRole } = component

    const increaseQuantity = getByRole('button', {name: "+"});
    const decreaseQuantity = getByRole('button', {name: "-"});

    expect(increaseQuantity).toBeTruthy();
    expect(decreaseQuantity).toBeTruthy();
  });

  it("decrease button is disabled when value is 1", () => {
    const { getByRole } = component

    const decreaseQuantity = getByRole('button', {name: "-"});
    expect(decreaseQuantity).toBeDisabled()
  })

  it("increase button is disabled when value is 99", () => {
    const { rerender, getByRole } = component
    rerender(<Counter value={99} handleValueChange={jest.fn} />)

    const increaseQuantity = getByRole('button', {name: "+"});
    expect(increaseQuantity).toBeDisabled()
  })

  it("renders value with passed prop", async () => {
    const { getByTitle } = component

    const counterValue = getByTitle('Current quantity');
    expect(counterValue).toBeTruthy()
    expect(counterValue).toHaveTextContent("1")
  });
});
