import Head from 'next/head'
import Link from 'next/link'

export default function Blogs({ blogs }) {

    function deleteBlog(id) {
        fetch(`${process.env.APIURL}/blogs/articles/${id}`, {
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
                <title>Blogs</title>
            </Head>
            <h1>Blogs</h1>
            <table>
                <tbody>
                    {blogs.map((blog) => ( //add curly braces to write js in html portion of jsx
                        <tr key = {blogs._id}>
                            <td>
                                <Link href = {`/blogs/${blog._id}`}>
                                    <li>{blog.title}</li>
                                </Link>
                            </td>
                            <td>
                                <button onClick = {() => deleteBlog(blog._id)}>Delete</button>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </>
    )
}

export async function getServerSideProps() {
    console.log("API_URL: ", process.env.APIURL)
    console.log("API_URL local: ", process.env.APIURL)
    const res = await fetch(`${process.env.APIURL}/blogs/articles/`)
    const blogs = await res.json()
    return { props: { blogs } }
}