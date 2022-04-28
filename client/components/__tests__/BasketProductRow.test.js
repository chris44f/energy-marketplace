import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { BasketProductRow } from "../BasketProductRow";
import { MockedProvider } from '@apollo/client/testing';
import { GET_PRODUCT_FOR_BASKET } from "../../graphql/product/queries";

const mocks = [
  {
    request: {
      query: GET_PRODUCT_FOR_BASKET,
      variables: {
        productId: 1,
      },
    },
    result: {
      data: {
        findProductById: { name: "TestProduct", price: 1099, img_url: "testurl.jpg" },
      },
    },
  },
]

describe('BasketProductRow', () => {
  test('renders Loading... during api call', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BasketProductRow />
      </MockedProvider>
    );

    expect(screen.getByText(/Loading.../i)).toBeTruthy()
  })

  test("renders name, image, price and add to basket component", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BasketProductRow productId={1} productQuantity={3} refreshBasket={jest.fn} />
      </MockedProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(screen.getByText('TestProduct')).toBeTruthy()
    // 3 products * 10.99 = 32.97
    expect(screen.getByText('32')).toBeTruthy()
    expect(screen.getByText('.97')).toBeTruthy()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'testurl.jpg')
    expect(screen.getByAltText('TestProduct')).toBeTruthy()

    expect(screen.getByRole('button', { name: /\+/i })).toBeTruthy()
    expect(screen.getByTitle('Current quantity')).toHaveTextContent("3")
    expect(screen.getByRole('button', { name: /-/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Update basket/i })).toBeTruthy()

  });
});
