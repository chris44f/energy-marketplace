import Image from 'next/image'
import Link from 'next/link'
import { AddToBasket } from "./AddToBasket";

export const ProductTile = ({ name, imageUrl, price, quantity: productQuantity, power, id }) => {
  return(
    <div className="flex flex-col">
         {/*// style={{ display: 'flex', flexDirection: 'column', height: '50vh'}}*/}
      <div className="flex flex-col items-center bg-gradient-to-b from-blue-dark via-blue-dark to-blue pt-8">
        <div className="w-60 h-60 relative">
           {/*style={{ width: '50%', height: '50%', position: 'relative' }}*/}
          <Image className="pl-8" src={imageUrl} alt={name} layout={"fill"} objectFit={"contain"}/>
        </div>
        <p className="text-sub-heading font-bold text-white pl-8 self-start">{name}</p>
        <p className="text-base text-blue-accent pl-8 mb-4 self-start">{`${power} // ${productQuantity === 1 ? 'Single' : `Packet of ${productQuantity}`}`}</p>
      </div>
      <AddToBasket price={price} productId={id}/>
      <Link href={`/product/${encodeURIComponent(id)}`}>
        <a className="text-base font-bold text-blue-light self-center py-2 hover:underline">More detail</a>
      </Link>
    </div>
  )
}
