import Head from 'next/head'
import Link from 'next/link'
import { useState } from "react";
import { useForm } from "react-hook-form";

//export: you can export multiple functions from a single file but only have one default export

//Step 2: Component rendered on server (SSR: Server-side rendering)
export default function Product({ product }) {
    const {register, handleSubmit} = useForm(); //handleSubmit is a tool provided by the react-hook-form hook
    const [data, setData] = useState("");

    const saveBlog = async (data) => {
        const response = await fetch(`/api/stock/products/${product._id}`, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
          });
        const result = await response.json();
        console.log(result)
        setData(JSON.stringify(data)) // an arrow function that receives a single parameter, data, and sets the state of data to the stringified version of the data parameter
    }

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

            <h1>Update Product Details: {product.name}</h1>

            <div style = {{margin: "1rem"}}>
                <form onSubmit = {handleSubmit(saveBlog)}>

                    <label htmlFor = "name">Product Name</label><br/>
                    <input id = "name" {...register("name")} placeholder = "Product name" defaultValue = {product.name}/><br/><br/>

                    <label htmlFor="code">Product Code</label><br/>
                    <input id = "code" {...register("code")} placeholder = "Product Code" defaultValue = {product.code}/><br/><br/>
                    
                    <label htmlFor="price">Product Price</label><br />
                    <input type = "number" id="price" {...register("price")} placeholder="Product price / bottle"  defaultValue = {product.price}/><br /><br/>

                    <input type="submit" />
                    <p>{data}</p>
                </form>
                <Link href = "/products"><button variant = "primary" >Back to Product Menu</button></Link>
            </div>
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