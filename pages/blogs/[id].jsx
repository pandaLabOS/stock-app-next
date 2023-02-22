import Head from 'next/head'
import Link from 'next/link'
import Button from 'react-bootstrap/Button';

//export: you can export multiple functions from a single file but only have one default export

//Step 2: Component rendered on server (SSR: Server-side rendering)
export default function Blog({ blog }) {

    if (!blog) return (
        <div>
            <p>Blog not found</p>
            <Link href = "/blogs">Back</Link>
        </div>
    )

    return (
        <>
            <Head>
                <title>{blog.title}</title>
            </Head>

            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <Link href = "/blogs">Back</Link>
        </>
    )
}

//STEP 1: Function executed server-side before rendering page ---- Whether you write the function above or below the html section makes no difference
//params.id == params comes from the file name. If the file name blog_id, then it will be param.blog_id. Basically, param.<fileName>
export async function getServerSideProps({ params }) {
    const res = await fetch(`http://localhost:3000/api/blogs/articles/${params.id}`)
    const blog = await res.json()
    return { props: { blog } }
}