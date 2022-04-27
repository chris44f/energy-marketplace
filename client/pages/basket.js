import Link from 'next/link'
import {useQuery} from "@apollo/client";
import {GET_BASKET} from "../components/AddToBasket";
import {BasketProductRow} from "../components/BasketProductRow";

export default function Basket() {
  const { loading, error, data } = useQuery(GET_BASKET, { variables: { basketId: "1" }});

  if (loading) return <div>Loading...</div>
  if (error) return <div>There was an error fetching your basket details, please refresh the page.</div>

  const { contents, basketEmpty } = data.Basket

  return (
    <div>
      <h1>Your basket contents</h1>
      <h2>{`You have ${contents.length} item${contents.length !== 1 ? 's' : ''} in your basket`}</h2>
      {basketEmpty ? <p><Link href="/marketplace"><a>Browse our products</a></Link></p> : null}
      <div>
        {contents.map(product => <BasketProductRow productId={"1"} productQuantity={12} />)}
      </div>
    </div>
  )
}
