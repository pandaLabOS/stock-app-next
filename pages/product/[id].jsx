import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ProductPage(props) {
  const { product } = props;

  if (!product) return (<div>Loading...</div>)
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <h1>{product.title}</h1>
      <div>
        <p>${product.description}</p>
        <p>${product.price}</p>
      </div>
      <Link href="/product">Back to Product List</Link>
    </>
  )
}

export async function getServerSideProps(context) {
  console.log(`Fetching Product ID: ${context.params['id']}`)
  console.debug(`Fetching ${process.env.APIURL}product/${context.params['id']}`)
  const ret = await fetch(`${process.env.APIURL}product/${context.params['id']}`)
  const product = await ret.json()
  console.log(product)
  return {
    props: {
      product
    }
  }

}