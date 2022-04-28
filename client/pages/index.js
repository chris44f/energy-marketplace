import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={`${styles.container} bg-blue`}>
      <Head>
        <title>Octopus Energy Marketplace</title>
        <meta name="description" content="energy products from Octopus" />
        <link rel="icon" href="https://static.octopuscdn.com/constantine/constantine.svg" />
      </Head>

      <main className={`${styles.main}`}>
        <h1 className={`${styles.title} text-blue-light py-8`}>
          Welcome to Octopus Energy Equipment
        </h1>
        <Image alt="constantine" width="160" height="177" src="https://static.octopuscdn.com/constantine/constantine.svg"/>
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
