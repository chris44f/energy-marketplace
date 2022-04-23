import { gql } from "@apollo/client";
import client from "../apollo-client"
import {ProductTile} from "../components/ProductTile";

export default function Marketplace({ products }) {
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

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
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
    `,
  });

  return {
    props: {
      products: data.allProducts,
    },
  }
}
