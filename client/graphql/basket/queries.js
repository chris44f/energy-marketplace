import { gql } from "@apollo/client";

export const GET_BASKET = gql`
  query GetBasket($basketId: ID!) {
    Basket(id: $basketId) {
      contents
      basketEmpty
    }
  }
`
