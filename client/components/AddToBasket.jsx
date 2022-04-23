import {useState} from "react";
import {Counter} from "./Counter";

export const AddToBasket = ({ price }) => {
  const [quantity, setQuantity] = useState(1)

  const formattedPrice = (price / 100).toFixed(2)

  const handleAddItem = () => {
    //  Add redux action to handle adding item to basket
  }

  return (
    <div>
      <p>{formattedPrice}</p>
      <Counter value={quantity} handleValueChange={setQuantity} />
      <button onClick={handleAddItem}>Add to basket</button>
    </div>
  )
}
