import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link'

export default function addProduct() {
    const {register, handleSubmit} = useForm(); //handleSubmit is a tool provided by the react-hook-form hook
    const [data, setData] = useState("");

    const saveBlog = async (data) => {
        const response = await fetch('/api/stock/products', {
            method: "POST",
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

    return (
        <div style = {{margin: "1rem"}}>
            <form onSubmit = {handleSubmit(saveBlog)}>
                <h1>New Product</h1><br/>
                <label htmlFor = "name">Product Name</label><br/>
                <input id = "name" {...register("name")} placeholder = "Product name"/><br/><br/>

                <label htmlFor="code">Category</label><br/>
                <input id = "code" {...register("code")} placeholder = "Product Code"/><br/><br/>
                {/* <select id="category" {...register("category", { required: true })}>
                    <option value="" default disabled>Select</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Entree">Entree</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Soup">Soup</option>
                    <option value="MainCourse">Main Course</option>
                    <option value="Dessert">Dessert</option>
                </select> */}
                <br/><br/>

                <label htmlFor="price">Product Price</label><br />
                <input type = "number" id="price" {...register("price")} placeholder="Product price / bottle" /><br /><br/>
                <input type="submit" />
                <p>{data}</p><br/><br/>
            </form>
            <Link href = "/products"><button variant = "primary" >Back to Product Menu</button></Link>
        </div>
    )
}