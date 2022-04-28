import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from "@apollo/client";
import {GET_BASKET} from "../graphql/basket/queries";

export const NavBar = () => {
  const { data } = useQuery(GET_BASKET, { variables: { basketId: "1" }})
  const basketTotal = data?.Basket?.basketTotal
  const contents = data?.Basket?.contents

  return(
    <nav className="fixed top w-full h-16 px-8 bg-blue-dark z-50 flex flex-row items-center justify-between">
      <Image className="left" src={"/octopus-energy-logo.jpg"} alt="Octopus energy" height={28} width={140} objectFit={"cover"} />
      <div>
        <ul className="flex flex-row">
          <li>
            <Link href="/products">
              <a className="text-sub-heading text-white hover:underline active:underline">Products</a>
            </Link>
          </li>
          {basketTotal > 0 ? <span title="Basket Items" className="hidden sm:block text-sub-heading text-blue-light pl-16">{`Basket Items: ${contents.length}`}</span> : null}
          <li>
            <Link href="/basket">
              <a className="text-sub-heading text-pink pl-16 hover:underline active:underline">Basket</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
