import Head from 'next/head'
import Link from 'next/link'

//export: you can export multiple functions from a single file but only have one default export

//Step 2: Component rendered on server (SSR: Server-side rendering)
export default function Product({ product }) {
    console.log(`Product.name: ${JSON.stringify(product)}`)

    if (!product) return (
        <div>
            <p>Product not found</p>
            <Link href = "/products">Back</Link>
        </div>
    )

    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>

            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <Link href = "/products">Back</Link>
        </>
    )
}

//STEP 1: Function executed server-side before rendering page ---- Whether you write the function above or below the html section makes no difference
//params.id == params comes from the file name. If the file name blog_id, then it will be param.blog_id. Basically, param.<fileName>
export async function getServerSideProps({ params }) {
    console.log("API_URL: ", process.env.APIURL)
    const res = await fetch(`${process.env.API_URL}/stock/products/${params.id}`)
    const product = await res.json()
    return { props: { product } }
}