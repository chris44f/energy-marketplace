import { useState } from 'react'
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../../apollo-client";

export default function Product({ product }) {
  const [productQuantity, setProductQuantity] = useState(1)

  const { id,
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

  const formattedPrice = (price / 100).toFixed(2)

  const handleQuantityDecrease = () => {
    if (quantity === 1) return;

    setProductQuantity(current => current -1)
  }

  const handleQuantityIncrease = () => {
    if (quantity === 99) return;

    setProductQuantity(current => current +1)
  }

  const handleAddItem = () => {
    //  Add redux action to handle adding item to basket
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '50vh'}}>
      <div style={{ width: '50%', height: '50%', position: 'relative' }}>
        <Image src={img_url} alt={name} layout={"fill"} objectFit={"contain"}/>
      </div>
      <h1>{name}</h1>
      <p>{`${power} // ${quantity === 1 ? 'Single' : `Packet of ${quantity}`}`}</p>
      <p>{formattedPrice}</p>
      <button onClick={handleQuantityDecrease} disabled={productQuantity === 1}>-</button>
      <span>{productQuantity}</span>
      <button onClick={handleQuantityIncrease} disabled={productQuantity === 99}>+</button>
      <button onClick={handleAddItem}>Add to basket</button>
      <h2>Description</h2>
      <p>{description}</p>
      <h2>Specifications</h2>
      <div>
        <ul>
          <li>
            <p>Brand</p>
            <p>{brand}</p>
          </li>
          <li>
            <p>Item weight</p>
            <p>{weight}</p>
          </li>
          <li>
            <p>Dimensions</p>
            <p>{height}x{width}x{length}</p>
          </li>
          <li>
            <p>Item model number</p>
            <p>{model_code}</p>
          </li>
          <li>
            <p>Colour</p>
            <p>{colour}</p>
          </li>
        </ul>
      </div>
    </div>
  )

}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query _allProductsMeta {
        _allProductsMeta {
          count
        }
      }
    `
  });

  const paths = [];

  for (let i = 1; i <= data._allProductsMeta.count; i++) {
    paths.push({ params: { id: i.toString() }})
  }

  return { paths, fallback: false }
}

 const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    Product(id: $productId) {
      id
      name
      price
      img_url
      quantity
      power
      description
      brand
      weight
      height
      width
      length
      model_code
      colour
    }
  }
`

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_PRODUCT,
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
