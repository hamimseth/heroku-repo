const express = require('express')
const bodyParser = require('body-parser')
const cors= require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oavw7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors());
const port = 5001



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("emaJohnStore").collection("Products");

    app.post('/addProducts', (res, req)=>{
      const product = req.body
      console.log(product)
      productsCollection.insertMany(product)
      .then(result => {
        console.log(result)
        res.send(result.insertedCount)
      })
    })
  
    app.get('/products', (res, req)=>{
      productsCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
    })
    app.get('/products/:key', (res, req)=>{
      productsCollection.find({key: req.params.key})
      .toArray((err, documents) => {
        res.send(documents[0])
      })
    })

    app.post('/productsByKeys', (res, req)=>{
      const productKeys = req.body;
      productsCollection.find({key:{$in }})
    })
  
});


app.listen(port)
