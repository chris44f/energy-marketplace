import {useState} from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_BASKET } from '../graphql/basket/mutations'
import { GET_BASKET } from '../graphql/basket/queries'
import { Counter } from "./Counter";

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
