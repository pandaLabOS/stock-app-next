import Head from 'next/head'
import Link from 'next/link'

export default function Home(props) {
  const { products } = props;

  if (!products) return (<div>Loading...</div>)

  const list = products.map((product) => (
    <li key={product.id}>
      <Link href={`/product/${product.id}`}>
        {product.title}
      </Link>
    </li>
  ))

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <h1>Products</h1>
      <div>
        <ul>
          {list}
        </ul>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  // products.json is in /public
  console.debug(`Fetching ${process.env.APIURL}product`)
  const ret = await fetch(`${process.env.APIURL}product`)
  const products = await ret.json()
  console.log({ products })
  return {
    props: {
      products
    }
  }
}