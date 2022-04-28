import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing';
import { ProductTile } from "../ProductTile";

describe('ProductTile', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductTile name={'TestProduct'} imageUrl={'/testUrl.jpg'} price={1099} quantity={4} power={'35W'} />
      </MockedProvider>
    );
  })

  test("renders props appropriately", async () => {

    expect(screen.getByText('TestProduct')).toBeTruthy()
    expect(screen.getByText('10')).toBeTruthy()
    expect(screen.getByText('.99')).toBeTruthy()

    expect(screen.getByRole('img')).toHaveAttribute('src')
    expect(screen.getByAltText('TestProduct')).toBeTruthy()

    expect(screen.getByText('35W // Packet of 4')).toBeTruthy()
  })

  test('renders add to basket button and link for more details', () => {
    expect(screen.getByRole('link', { name: /More detail/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Add to cart/i })).toBeTruthy()
  });
});
