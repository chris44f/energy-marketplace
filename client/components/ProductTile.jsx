import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const ProductTile = ({ name, imageUrl, price, quantity: productQuantity, power, id }) => {
  const [quantity, setQuantity] = useState(1)

  const formattedPrice = (price / 100).toFixed(2)

  const handleQuantityDecrease = () => {
    if (quantity === 1) return;

    setQuantity(current => current -1)
  }

  const handleQuantityIncrease = () => {
    if (quantity === 99) return;

    setQuantity(current => current +1)
  }

  const handleAddItem = () => {
  //  Add redux action to handle adding item to basket
  }

  return(
    <div style={{ display: 'flex', flexDirection: 'column', height: '50vh'}}>
      <div style={{ width: '50%', height: '50%', position: 'relative' }}>
        <Image src={imageUrl} alt={name} layout={"fill"} objectFit={"contain"}/>
      </div>
      <p>{name}</p>
      <p>{`${power} // ${productQuantity === 1 ? 'Single' : `Packet of ${productQuantity}`}`}</p>
      <p>{formattedPrice}</p>
      <button onClick={handleQuantityDecrease} disabled={quantity === 1}>-</button>
      <span>{quantity}</span>
      <button onClick={handleQuantityIncrease} disabled={quantity === 99}>+</button>
      <button onClick={handleAddItem}>Add to basket</button>
      <Link href={`/product/${encodeURIComponent(id)}`}><a>More detail</a></Link>
    </div>
  )
}
