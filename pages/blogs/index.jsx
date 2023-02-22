import Head from 'next/head'
import Link from 'next/link'

export default function Blogs({ blogs }) {

    function deleteBlog(id) {
        fetch(`${process.env.API_URL}/api/blogs/articles/${id}`, {
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
    const res = await fetch(`http://localhost:3000/api/blogs/articles/`)
    const blogs = await res.json()
    return { props: { blogs } }
}