import Head from 'next/head'
import Link from 'next/link'

export default function Products({ returnProps }) {
    const products = returnProps[0]
    const API_URL = returnProps[1]

    function deleteProduct(id, API_URL) {
        fetch(`${API_URL}/stock/products/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json; charset=UTF-8'  })
        .then(res => res.json())
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`)
        } else {
            .then(data => {
                window.location.reload(false);
            })
        }
        
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
                        <tr key = {product._id}>
                            <td>
                                <Link href = {`/products/${product._id}`}>
                                    <li>{product.name}</li>
                                </Link>
                            </td>
                            <td>
                                <button onClick = {() => deleteProduct(product._id, API_URL)}>Delete</button>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.API_URL}/stock/products/`)
    const products = await res.json()
    const returnProps = [ products, process.env.API_URL ]
    return { props: { returnProps } }
}