import Head from 'next/head'
import Link from 'next/link'

export default function Blogs({ returnProps }) {

    const articles = returnProps[0]
    const API_URL = returnProps[1]
    
    const Article = models?.article || model('article', articleSchema);

    function deleteBlog(id, API_URL) {
        fetch(`${API_URL}/blogs/articles/${id}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json;' } })
        .then(res => res.json())
        .then(data => {
            window.location.reload(false);
        })
        
    }

    function deleteByID(_id) {
        return this.deleteOne({ _id: _id })
    }

    return (
        <>
            <Head>
                <title>Blogs</title>
            </Head>
            <h1>Blogs</h1>
            <table>
                <tbody>
                    {articles.map((article) => ( //add curly braces to write js in html portion of jsx
                        <tr key = {article._id}>
                            <td>
                                <Link href = {`/blogs/${article._id}`}>
                                    <li>{article.title}</li>
                                </Link>
                            </td>
                            <td>
                                <button onClick = {() => deleteBlog(article._id, API_URL)}>Delete</button>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </>
    )
}

export async function getServerSideProps() {
    console.log(`process.env.API_URL: ${process.env.API_URL}`)
    const res = await fetch(`${process.env.API_URL}/blogs/articles/`)
    const blogs = await res.json()
    const returnProps = [ blogs, process.env.API_URL ]
    return { props: { returnProps } }
}