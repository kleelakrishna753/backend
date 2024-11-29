import express from "express";
// const express = require('express');
import cors from "cors"
const app = express()
app.use(express.json());
app.use(cors());

// const usr = encodeURIComponent("sparestorage36")
// const pwd = encodeURIComponent("IndMjBkzX0Y7PsAJ")

app.listen(8080,()=>{
    console.log("Server started at port 8080")
})

import { MongoClient, ObjectId } from "mongodb";
//const uri = "mongodb://127.0.0.1:27017"
const uri = "mongodb+srv://${usr}:${pwd}@cluster0.on6eg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//sparestorage36:IndMjBkzX0Y7PsAJ
//${usr}:${pwd}
const client = new MongoClient(uri)
//const db = client.db("ecomm1")
async function run() {
    try {
      await client.connect();
      const db = client.db("ecomm1");
      const collection = db.collection("products");
      
      const result = await collection.find({}).toArray();
      console.log(result);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      // Close the client only after operations are complete
      await client.close();
    }
  }
  
run();
  
app.get("/", async (req,res)=>{
    //res.send("Hello World")
    const items =  await db.collection("products").find().toArray()
    res.status(200).json(items);
})

app.post("/", async (req, res) => {
    const { name, price } = req.body;
    const data = {
      name: name,
      price: price,
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
});
  
  
app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
    res.status(200).json(newProduct);
});
  
app.get("/home",(req,res)=>{
    res.send("this is home api")
})

app.get("/name",(req,res)=>{
    res.send("Leela Krishna")
})

// app.get("/customers",(req,res)=>{
//     let customers = [
//         {
//             "name":"Customer 1",
//             "Contact":"9705359075",
//         }
//     ]
// })

// app.get("/products",(req,res)=>{

//     let products = [
//         {
//             "name":"Product 1",
//             "price":34
//         }
//     ] //let products = get list from mongodb


//     res.json(products)
// })



