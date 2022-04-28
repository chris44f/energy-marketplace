import Image from 'next/image'
import Link from 'next/link'
import { AddToBasket } from "./AddToBasket";

export const ProductTile = ({ name, imageUrl, price, quantity: productQuantity, power, id }) => {
  return(
    <div className="flex flex-col justify-between border-2 border-blue-accent hover:border-blue-light rounded">
      <div className="flex flex-col items-center bg-gradient-to-b from-blue-dark via-blue-dark to-blue pt-8">
        <div className="w-60 h-60 relative">
          <Image className="pl-8" src={imageUrl} alt={name} layout={"fill"} objectFit={"contain"}/>
        </div>
        <p className="text-sub-heading font-bold text-white px-8 self-start">{name}</p>
        <p className="text-base text-blue-accent px-8 mb-4 self-start">{`${power} // ${productQuantity === 1 ? 'Single' : `Packet of ${productQuantity}`}`}</p>
      </div>
      <div className="flex flex-col items-center">
        <AddToBasket price={price} productId={id}/>
        <Link href={`/product/${encodeURIComponent(id)}`}>
          <a className="text-base font-bold text-blue-light py-2 hover:underline">More detail</a>
        </Link>
      </div>
    </div>
  )
}
