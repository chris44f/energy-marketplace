import { gql } from "@apollo/client";

export const UPDATE_BASKET = gql`
  mutation UpdateBasket($updateBasketId: ID!, $contents: JSON!, $basketTotal: Int) {
    updateBasket(id: $updateBasketId, contents: $contents, basketTotal: $basketTotal) {
      contents
      basketTotal
    }
  }
`
