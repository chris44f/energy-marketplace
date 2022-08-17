import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={`${styles.container} bg-blue`}>
      <Head>
        <title>Energy Marketplace</title>
        <meta name="description" content="energy products" />
      </Head>

      <main className={`${styles.main}`}>
        <h1 className={`${styles.title} text-blue-light py-8`}>
          Welcome to Energy Equipment Marketplace
        </h1>
        <h2 className='text-blue-light py-8 text-sub-heading'>
          <Link href="/products">
            <a>
              Go to product page
            </a>
          </Link>
        </h2>
      </main>
    </div>
  )
}
