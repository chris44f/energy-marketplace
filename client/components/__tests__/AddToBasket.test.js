import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { AddToBasket } from "../AddToBasket";
import { MockedProvider } from '@apollo/client/testing';
import userEvent from "@testing-library/user-event";

const mocks = []

describe('AddToBasket', () => {
  test("should be able to increase and decrease product quantity", async () => {
    const user = userEvent.setup()

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddToBasket/>
      </MockedProvider>
    );

    await user.click(screen.getByRole('button', {name: /\+/i}))
    expect(screen.getByTitle('Current quantity')).toHaveTextContent('2')

    await user.click(screen.getByRole('button', {name: /-/i}))
    expect(screen.getByTitle('Current quantity')).toHaveTextContent('1')
  });

  test("renders price of product from passed props", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddToBasket price={1099}/>
      </MockedProvider>
    );

    expect(screen.getByText(/10/i)).toBeTruthy()
    expect(screen.getByText(/.99/i)).toBeTruthy()
  });

  test("renders passed prop of existing quantity as value in counter", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddToBasket existingQuantityInBasket={4}/>
      </MockedProvider>
    );

    expect(screen.getByTitle('Current quantity')).toHaveTextContent("4");
  });
});
