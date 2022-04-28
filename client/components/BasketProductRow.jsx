import { useQuery } from "@apollo/client";
import { GET_PRODUCT_FOR_BASKET } from "../graphql/product/queries";
import { AddToBasket } from "./AddToBasket";

export const BasketProductRow = ({ productId, productQuantity, refreshBasket }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT_FOR_BASKET, { variables: { productId }})

  if (loading) return <div>Loading...</div>
  if (error) return <div>There has been an error, please refresh the page.</div>

  const { name, img_url, price } = data.findProductById

  return(
    <div className="flex flex-row h-48 min-h-fit justify-around border-2 border-blue-accent bg-blue-dark">
      <p className="text-white w-4/5 p-8 sm:text-sub-heading">
        {name}
      </p>
      <img className="hidden sm:block"src={img_url} alt={name} />
      <div className="w-1/4 min-w-[250px]">
        <AddToBasket
          price={price}
          productId={productId}
          existingQuantityInBasket={productQuantity}
          refreshBasket={refreshBasket}
        />
      </div>
    </div>
  )
}
