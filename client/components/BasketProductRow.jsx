import { useQuery } from "@apollo/client";
import { GET_PRODUCT_FOR_BASKET } from "../graphql/product/queries";
import { AddToBasket } from "./AddToBasket";

export const BasketProductRow = ({ productId, productQuantity, refreshBasket }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT_FOR_BASKET, { variables: { productId }})

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
