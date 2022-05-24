const express = require('express')

const getData = require('./Controllers/getData')
const products = require('./Models/products')

const productsData = getData()

const app = express()
const PORT = 3000

//Middleware functions
//they update the request as soon as they come in
app.use((req, res, next) => {
    console.log(`Running middleware function!!`);
    next()      //got to the next middleware or to the responce
})

//JSON Middleware
app.use(express.json())
//if don't need read data from the url
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', (req, res) =>{
    res.render('home', {
        pageTitle: 'Home Page', pageHeader:'Welcome Shoppers'})
    
})

app.get('/products', (req, res) =>{
    res.render('products',{data:productsData, pageTitle: 'Products Page', productsPage: 'Aur Products' })
    //res.send(productsData)
})

app.get('/products/new', (req, res) =>{
    res.render('newProduct')
})

//create a new product
app.post('/products', (req, res) => {
    console.log(req.body);

    productsData.push(req.body)
    res.redirect('/products')
})

//search product by id
app.get('/products/:id', (req, res) =>{
    console.log(req.params);

    const result = products.filter(item => item.id === Number(req.params.id))
    // console.log(result)
    res.render('searchProduct', {pageHeader: 'Product Details', data:result[0]})
    
    //res.render('searchProduct', { pageHeader: 'Product Details', data:productsData[(req.params.id) - 1]})
})



app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
})