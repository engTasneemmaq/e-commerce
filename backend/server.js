import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (req,res)=>{
    res.send(data.products);
})

//:slug to get data this product from backend
app.get('/api/products/slug/:slug', (req,res)=>{
   const product= data.products.find(x => x.slug === req.params.slug);
   if(product){
       res.send(product);
    }
    else{
        res.status(404).send({message: "product not found"});
    } 
});

const port= process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server at http://localhost:${port}`);
})