import {useState} from "react";
import {Counter} from "./Counter";
import {gql, useLazyQuery, useMutation} from "@apollo/client";

const UPDATE_BASKET = gql`
  mutation UpdateBasket($updateBasketId: ID!, $contents: JSON!, $basketEmpty: Boolean!) {
    updateBasket(id: $updateBasketId, contents: $contents, basketEmpty: $basketEmpty) {
      contents
      basketEmpty
    }
  }
`

export const GET_BASKET = gql`
  query GetBasket($basketId: ID!) {
    Basket(id: $basketId) {
      contents
      basketEmpty
    }
  }
`

interface Props {
  price: number;
  productId: string;
  existingQuantity?: number,
  refreshBasket?: Function
}

export const AddToBasket = ({ price, productId, existingQuantity, refreshBasket }: Props) => {
  const [quantity, setQuantity] = useState(existingQuantity ?? 1)
  const formattedPrice = (price / 100).toFixed(2)

  const [updateBasket, { data, loading: updateLoading, error: updateError }] = useMutation(UPDATE_BASKET);
  const [getBasket] = useLazyQuery(GET_BASKET);

  const updateBasketContents = (currentBasket, addedProduct) => {
    const updatedBasket = currentBasket.filter(product => product.productId)
    const updatedProductIndex = updatedBasket.findIndex(product => product.productId === addedProduct.productId.toString())

    if (updatedProductIndex < 0) {
      return [...updatedBasket, addedProduct]
    } else {
      updatedBasket[updatedProductIndex] = {
        ...addedProduct,
        quantity: existingQuantity ?
          addedProduct.quantity :
          (updatedBasket[updatedProductIndex].quantity + addedProduct.quantity)
      }
      return updatedBasket
    }
  }

  const handleAddItem = async () => {
    const { data } = await getBasket({ variables: { basketId: "1" }})

    const updatedBasketContents = updateBasketContents(data.Basket.contents, { productId, quantity })

    await updateBasket({ variables: {
      "updateBasketId": "1",
      "contents": updatedBasketContents,
      "basketEmpty": false
    }})

    refreshBasket ? refreshBasket() : null;
  }

  return (
    <div>
      <p>{formattedPrice}</p>
      <Counter value={quantity} handleValueChange={setQuantity} />
      <button onClick={handleAddItem}>{existingQuantity ? 'Update basket' : 'Add to basket'}</button>
    </div>
  )
}
