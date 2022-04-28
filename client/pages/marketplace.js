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
    <main className="bg-blue p-8">
      <Link href="/basket">
        <a className="text-pink float-right hover:underline active:underline">Go to your basket</a>
      </Link>
      <h1 className="text-blue-light text-heading font-bold">Products</h1>
      <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-4 gap-4">
        {products.length > 0 ? renderProducts() : null}
      </div>
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
