import { gql } from "@apollo/client";
import client from "../apollo-client"
import {ProductTile} from "../components/ProductTile";

export default function Marketplace({ products, baskets }) {
  const renderProducts = () => (
    products.map((
      {
        id,
        name,
        price,
        img_url,
        quantity,
        power
      }) => <ProductTile
        key={id}
        name={name}
        id={id}
        imageUrl={img_url}
        price={price}
        power={power}
        quantity={quantity}
      />
    )
  )

  return (
    <main>
      <div>
        {products.length > 0 ? renderProducts() : null}
      </div>
    </main>
  );
};

const GET_ALL_PRODUCTS = gql`
  query AllProducts {
    allProducts {
      id
      name
      price
      img_url
      quantity
      power
    }
  }
`

const GET_ALL_BASKETS = gql`
  query AllBaskets {
    allBaskets {
      id
      basketEmpty
      contents
    }
  }
`

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_ALL_PRODUCTS
  });

  const baskets = await client.query({
    query: GET_ALL_BASKETS
  })

  return {
    props: {
      products: data.allProducts,
      baskets: baskets.data.allBaskets,
    },
  }
}
