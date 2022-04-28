import Image from "next/image";
import client from "../../apollo-client";
import { GET_PRODUCT_FULL, GET_PRODUCTS_COUNT } from "../../graphql/product/queries";
import { AddToBasket } from "../../components/AddToBasket";

export default function Product({ product }) {
  const {
    id,
    name,
    price,
    img_url,
    quantity,
    power,
    description,
    brand,
    weight,
    height,
    width,
    length,
    model_code,
    colour } = product;

  return (
    <main className="flex flex-col justify-between pt-8">
      <div className="flex flex-col items-center bg-gradient-to-b from-blue-dark via-blue-dark to-blue pt-8">
        <div className="w-60 h-60 relative">
          <Image className="pl-8" src={img_url} alt={name} layout={"fill"} objectFit={"contain"}/>
        </div>
        <p className="text-sub-heading font-bold text-white px-8 self-start">{name}</p>
        <p className="text-base text-blue-accent px-8 mb-4 self-start">{`${power} // ${quantity === 1 ? 'Single' : `Packet of ${quantity}`}`}</p>
      </div>
      <div className="flex flex-col items-center w-screen">
        <AddToBasket price={price} productId={id}/>
        <div className="bg-blue text-white w-full p-8">
          <h2 className="text-lg font-bold py-2">Description</h2>
          <p className="text-xs md:text-sm">{description}</p>
        </div>
        <div className="bg-blue-dark text-white w-full p-8">
          <h2 className="text-lg font-bold py-2">Specifications</h2>
          <ul>
            <li className="flex flex-row justify-start text-left">
              <p className="w-1/2 py-2">Brand</p>
              <p>{brand}</p>
            </li>
            <li className="flex flex-row">
              <p className="w-1/2 py-2">Item weight</p>
              <p>{weight}</p>
            </li>
            <li className="flex flex-row">
              <p className="w-1/2 py-2">Dimensions</p>
              <p>{`${height}x${width}x${length}`}</p>
            </li>
            <li className="flex flex-row">
              <p className="w-1/2 py-2">Item model number</p>
              <p>{model_code}</p>
            </li>
            <li className="flex flex-row">
              <p className="w-1/2 py-2">Colour</p>
              <p>{colour}</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_PRODUCTS_COUNT
  });

  const paths = [];

  for (let i = 1; i <= data._allProductsMeta.count; i++) {
    paths.push({ params: { id: i.toString() }})
  }

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_PRODUCT_FULL,
    variables: {
      productId: params.id
    }
  });

  return {
    props: {
      product: data.Product,
    },
  }
}

