import {connect, model, models, Schema} from "mongoose"
const connectionString = "mongodb+srv://user1:VHh5rZeupiNstAJQ@stockappnext.melcos9.mongodb.net/stock"

export default async function handler(req, res) {
    await connect(connectionString);
    console.log("req.method", req.method)
    console.log("req.params.id", req.query) //Because this is being run server-side, the console.log results in an output in the terminal (which is on the server) rather than the Dev Console on browsers (because those are client-side)

    const id = req.query.id

    //Get only one document
    if (req.method === 'GET') {
        const doc = await Product.findOne({ _id : id})
        res.status(200).json(doc)
    } 
    
    else if (req.method === 'DELETE') {
        const deletedDoc = await Product.deleteOne({ _id: id })
        res.status(200).json(deletedDoc)
    } 

    else if (req.method === 'POST') {
        const newDoc = await Product.create(req.body)
        res.status(200).json(newDoc)
    }

    else if (req.method === 'PUT') {
        const updatedDoc = await Product.updateOne({_id: id}, req.body)
        res.status(200).json(updatedDoc)
    }
    
    else {
        res.setHeader('Allow', ['GET', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
    const productSchema = new Schema({
        title: String,
        content: String
    })

    const Product = models?.product || model('product', productSchema);
    //if NextJS already uses mongoose and it is already defined, skip the new model creation (models?.Product) = check
    //otherwise, create a new model (model('product', productSchema))