import {useState} from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_BASKET } from '../graphql/basket/mutations'
import { GET_BASKET } from '../graphql/basket/queries'
import { Counter } from "./Counter";

interface Props {
  price: number;
  productId: string;
  existingQuantityInBasket?: number,
  refreshBasket?: Function
}

export const AddToBasket = ({ price, productId, existingQuantityInBasket, refreshBasket }: Props) => {
  const [quantity, setQuantity] = useState(existingQuantityInBasket ?? 1);
  const totalCost = existingQuantityInBasket ? existingQuantityInBasket * price : price;
  const formattedCost = (totalCost / 100).toFixed(2).toString().split('.')

  const [updateBasket, { data, loading: updateLoading, error: updateError }] = useMutation(UPDATE_BASKET);
  const [getBasket] = useLazyQuery(GET_BASKET);

  const updateBasketContents = (currentBasket, addedProduct) => {
    const updatedBasket = currentBasket.contents.filter(product => product.productId)
    const updatedProductIndex = updatedBasket.findIndex(product => product.productId === addedProduct.productId.toString())
    const addedProductCost = addedProduct.quantity * price

    const totalCostOfBasket = existingQuantityInBasket ? (currentBasket.basketTotal - (existingQuantityInBasket * price) + addedProductCost) : currentBasket.basketTotal + addedProductCost

    if (updatedProductIndex < 0) {
      return { contents: [...updatedBasket, addedProduct], basketTotal: totalCostOfBasket }
    } else {
      updatedBasket[updatedProductIndex] = {
        ...addedProduct,
        quantity: existingQuantityInBasket ?
          addedProduct.quantity :
          (updatedBasket[updatedProductIndex].quantity + addedProduct.quantity)
      }
      return { contents: updatedBasket, basketTotal: totalCostOfBasket }
    }
  }

  const handleAddItem = async () => {
    const { data } = await getBasket({ variables: { basketId: "1" }})

    const { contents, basketTotal } = updateBasketContents(data.Basket, { productId, quantity })

    await updateBasket({
      variables: {
        "updateBasketId": "1",
        "contents": contents,
        "basketTotal": basketTotal
      },
      refetchQueries: [GET_BASKET],
    })

    refreshBasket ? refreshBasket() : null;
  }

  return (
    <div className="flex flex-col w-full bg-blue-dark p-8">
      <div className="flex flex-row justify-between items-center">
        <div className="text-white flex flex-row items-start font-bold">
          <span className="text-sub-heading">{formattedCost[0]}</span>
          <span className="text-sm pt-1">{`.${formattedCost[1]}`}</span>
        </div>
        <Counter value={quantity} handleValueChange={setQuantity} />
      </div>
      <button className="bg-gradient-to-b from-pink to-pink-dark w-full rounded h-16 text-white text-sub-heading mt-4 font-bold" onClick={handleAddItem}>{existingQuantityInBasket ? 'Update basket' : 'Add to cart'}</button>
    </div>
  )
}
