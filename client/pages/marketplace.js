import Link from 'next/link'
import client from "../apollo-client"
import { GET_ALL_PRODUCTS } from "../graphql/product/queries";
import { ProductTile } from "../components/ProductTile";

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

      <p>
        <Link href="/basket">
          <a>Go to your basket</a>
        </Link>
      </p>
    </main>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_ALL_PRODUCTS
  });

  return {
    props: {
      products: data.allProducts,
    },
  }
}
