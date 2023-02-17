import {connect, model, models, Schema} from "mongoose"
const connectionString = 'mongodb+srv://user1:VHh5rZeupiNstAJQ@stockappnext.melcos9.mongodb.net/blogs'

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method", req.method)

    if (req.method === 'GET') {
        const docs = await Article.find()
        res.status(200).json(docs)
    } else if (req.method === 'POST') {
        console.log(req.body)
        res.status(200).json(req.body)
        
        // const doc = await Article.create(req.body)
        // res.status(201).json(doc)
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
    const articleSchema = new Schema({
        title: String,
        content: String
    })

    const Article = models?.article || model('article', articleSchema);
    //if NextJS already uses mongoose and it is already defined, skip the new model creation (models?.Article) = check
    //otherwise, create a new model (model('article', articleSchema))