import Head from 'next/head'
import Link from 'next/link'

export default function Products({ products }) {

  function deleteProduct(id) {
      fetch(`http://localhost:3000/api/stock/products/${id}`, {
          method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
          window.location.reload(false);
      })
  }
  return (
      <>
        <Head>
            <title>Products</title>
        </Head>
        <h1>Products</h1>
        <table>
            <tbody>
                {products.map((product) => ( //add curly braces to write js in html portion of jsx
                    <tr>
                        <td>
                            <Link href = {`/products/${product._id}`}>
                                <li key = {product._id}>{product.name}</li>
                            </Link>
                        </td>
                        <td>
                            <button onClick = {() => deleteProduct(product._id)}>Delete</button>
                        </td>
                    </tr>
                    
                ))}
            </tbody>
        </table>
      </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/stock/products/`)
  const products = await res.json()
  return { props: { products } }
}