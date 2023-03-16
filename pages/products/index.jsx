import Head from 'next/head'
import Link from 'next/link'
import Table from 'react-bootstrap/Table';

export default function Products({ returnProps }) {
    const products = returnProps[0]
    const API_URL = returnProps[1]
    // console.log(`products: ${products}`)
    // console.log(`API_URL: ${API_URL}`)

    function deleteProduct(id, API_URL) {
        // console.log(`API_URL: ${API_URL}`)
        fetch(`${API_URL}/stock/products/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json; charset=UTF-8'  }})
        .then(res => res.json())
        .then(data => {
            window.location.reload(false);
            console.log(data)
        })
        
    }
    return (
        <>
            <Head>
                <title>Products</title>
            </Head>
            <h1>Products</h1>
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => ( //add curly braces to write js in html portion of jsx
                        <tr key = {product._id}>
                            <td>
                                <a href = {`/products/${product._id}`}>{product.name}</a>
                            </td>
                            <td>
                                <p>{product.price}</p>
                            </td>
                            <td>
                                <button onClick = {() => deleteProduct(product._id, API_URL)}>Delete</button>
                            </td>
                            <td>
                                <Link href = {`/products/update/${product._id}`}><button>Update Product</button></Link>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
            <Link href = "/products/add"><button>+ New Product</button></Link>
            <Link href = "/"><button variant = "primary" >Back to home</button></Link>
        </>
    )
}

export async function getServerSideProps() {
    console.log(`process.env.API_URL: ${process.env.API_URL}`)
    const res = await fetch(`${process.env.API_URL}/stock/products/`)
    const products = await res.json()
    const returnProps = [ products, process.env.API_URL ]

    return { props: { returnProps } }
}