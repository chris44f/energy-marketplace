import { gql } from "@apollo/client";

export const UPDATE_BASKET = gql`
  mutation UpdateBasket($updateBasketId: ID!, $contents: JSON!, $basketEmpty: Boolean!) {
    updateBasket(id: $updateBasketId, contents: $contents, basketEmpty: $basketEmpty) {
      contents
      basketEmpty
    }
  }
`
