import Image from 'next/image'
import Link from 'next/link'
import { AddToBasket } from "./AddToBasket";

export const ProductTile = ({ name, imageUrl, price, quantity: productQuantity, power, id }) => {
  return(
    <div style={{ display: 'flex', flexDirection: 'column', height: '50vh'}}>
      <div style={{ width: '50%', height: '50%', position: 'relative' }}>
        <Image src={imageUrl} alt={name} layout={"fill"} objectFit={"contain"}/>
      </div>
      <p>{name}</p>
      <p>{`${power} // ${productQuantity === 1 ? 'Single' : `Packet of ${productQuantity}`}`}</p>
      <AddToBasket price={price} />
      <Link href={`/product/${encodeURIComponent(id)}`}><a>More detail</a></Link>
    </div>
  )
}
