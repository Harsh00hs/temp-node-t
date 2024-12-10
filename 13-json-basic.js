const express = require('express')
const app = express()

const { products, people } = require('./data.js')

app.get('/', (req, res) => {
    res.send('<h1>HEllo There!<h1><a href="/api/products">products</a>')
    // res.json([products,people])
    // res.json(people)
})
app.get('/api/products', (req, res) => {
    const newproduct = products.map((product) => {
        const { id, name, image } = product
        return { id, name, image }
    })
    res.json(newproduct)
})

app.get('/api/products/:product_id', (req, res) => {
    // console.log(req)
    // console.log(req.params)
    const { product_id } = req.params; // come in string convert to number

    const singleProduct = products.find((product) => product.id === Number(product_id))

    if (!singleProduct)
        res.status(404).send('Product not found')

    res.json(singleProduct)
})

app.get('/api/products/:product_id/reviews/:review_id', (req, res) => {
    console.log(req.params);
    res.send('Hello from review')
})

app.get('/api/query', (req, res) => {
    // console.log(req.query);
    const { search, limit } = req.query
    let sortedProduct = [...products];
    if (search) {
        sortedProduct = sortedProduct.filter((product) =>{
            return product.name.startsWith(search)
        })
    }
    if (limit) {
        sortedProduct = sortedProduct.slice(0, Number(limit))
    }
    if(sortedProduct<1){
        // res.status(200).send('no product found for your search')
       return res.status(200).json({success: true, data: []})
    }

    res.status(200).json(sortedProduct)
    // res.send('hello world')
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})