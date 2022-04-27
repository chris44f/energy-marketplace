import {useQuery, gql} from "@apollo/client";
import {AddToBasket} from "./AddToBasket";

const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    findProductById: Product(id: $productId) {
      name
      price
      img_url
    }
  }
`

export const BasketProductRow = ({ productId, productQuantity, refreshBasket }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { productId }})

  if (loading) return <div>Loading...</div>
  if (error) return <div>There has been an error</div>

  const { name, img_url, price } = data.findProductById

  return(
    <div>
      <p>
        {name}
      </p>
      <img src={img_url} alt={name}/>
      <p>
        {price}
      </p>
      <p>
        {productQuantity}
      </p>
      <AddToBasket price={price} productId={productId} existingQuantity={productQuantity} refreshBasket={refreshBasket}/>
    </div>
  )
}
