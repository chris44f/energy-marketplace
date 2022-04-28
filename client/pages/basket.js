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
    <main className="bg-blue p-8 h-screen">
      <h1 className="pt-8 text-blue-light text-heading font-bold">Your basket contents</h1>
      <h2 className="text-blue-light text-sub-heading">{`You have ${basketTotal > 0 ? contents.length : 0} item${basketTotal > 0 ? contents.length !== 1 ? 's' : '' : 's'} in your basket`}</h2>
      {basketTotal === 0 ?
        <Link href="/products">
          <a className="text-pink text-sub-heading hover:underline active:underline">Browse our products</a>
        </Link> : null}
      <div className="flex flex-col">
        {basketTotal > 0 ? contents.map(product => <BasketProductRow productId={product.productId} productQuantity={product.quantity} key={product.productId} refreshBasket={refetch} />) : null}
      </div>
      {basketTotal !== 0 ? <div className="text-white text-sub-heading font-bold pt-4">{`Total: ${(basketTotal / 100).toFixed(2)}`}</div> : null}
      {basketTotal !== 0 ? <button className="bg-gradient-to-b from-pink to-pink-dark w-full rounded h-16 text-white text-sub-heading mt-4 font-bold" onClick={handleEmptyBasket}>Empty your basket</button> : null}
    </main>
  )
}
