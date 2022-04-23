import React  from 'react';
import { gql } from "@apollo/client";
import client from "../apollo-client"

export default function Marketplace({ products }) {
  const renderProducts = () => {
    return products.map(product => {
      return (
        <p key={product.id}>{product.name}</p>
      );
      });
    }

  return (
    <main>
      <div>
        {renderProducts()}
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
