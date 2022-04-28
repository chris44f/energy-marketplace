import Link from 'next/link'
import { useMutation, useQuery } from "@apollo/client";
import { GET_BASKET } from "../graphql/basket/queries";
import { UPDATE_BASKET } from "../graphql/basket/mutations";
import { BasketProductRow } from "../components/BasketProductRow";

export default function Basket() {
  const { loading, error, data, refetch } = useQuery(GET_BASKET, { variables: { basketId: "1" }});
  const [updateBasket, { data: emptyData, loading: emptyLoading, error: emptyError }] = useMutation(UPDATE_BASKET);

  if (loading) return <div>Loading...</div>
  if (error) return <div>There was an error fetching your basket details, please refresh the page.</div>

  const { contents, basketTotal } = data.Basket

  const handleEmptyBasket = async () => {
    await updateBasket({ variables: {
        "updateBasketId": "1",
        "contents": [{}],
        "basketTotal": 0
      }})
    await refetch()
  }

  return (
    <div>
      <h1>Your basket contents</h1>
      <h2>{`You have ${basketTotal > 0 ? contents.length : 0} item${basketTotal > 0 ? contents.length !== 1 ? 's' : '' : 's'} in your basket`}</h2>
      {basketTotal === 0 ? <p><Link href="/marketplace"><a>Browse our products</a></Link></p> : null}
      <div>
        {basketTotal > 0 ? contents.map(product => <BasketProductRow productId={product.productId} productQuantity={product.quantity} key={product.productId} refreshBasket={refetch} />) : null}
      </div>
      {basketTotal !== 0 ? <div>{`Total: ${(basketTotal / 100).toFixed(2)}`}</div> : null}
      <button onClick={handleEmptyBasket}>Empty your basket</button>
    </div>
  )
}
