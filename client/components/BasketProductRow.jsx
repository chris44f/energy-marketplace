import {useQuery, gql} from "@apollo/client";

const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    findProductById: Product(id: $productId) {
      name
      price
      img_url
    }
  }
`

export const BasketProductRow = ({ productId, productQuantity }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { productId }})

  if (loading) return <div>Loading...</div>
  if (error) return <div>There has been an error</div>

  return(
    <div>
      <p>
        {data.findProductById.name}
      </p>
      <img src={data.findProductById.img_url} alt={data.findProductById.name}/>
      <p>
        {data.findProductById.price}
      </p>
      <p>
        {productQuantity}
      </p>
    {/*  TODO: Render a counter here and add in counter functionality */}
    </div>
  )
}
