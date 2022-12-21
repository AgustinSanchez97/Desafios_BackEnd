import  express from "express";
import productManager from "./ProductManager.js"

const app = express()



app.get("/", (req,res) => {
    res.send('<h1 style="color:blue;"> Bienvenido </h1>')
})


app.get("/products/:id", async (req,res) => {
    
    const{id} = req.params
    //const products = await productManager.getProductById(parseInt(id))
    const allProducts = await productManager.getProducts()    
    let productsToShow = [...allProducts]
    
    const product = productsToShow.find(product => product.id === parseInt(id))

    if(!product) return res.send("Producto no encontrado")
    res.json(product)
    

})


app.get("/products", async (req,res) => {
    
    const {limit} = req.query
    
    const allProducts = await productManager.getProducts()    
    let productsToShow = [...allProducts]

    
    if (limit > 0) productsToShow = productsToShow.slice(0,limit)
    
    res.json(productsToShow)

})

app.listen(3000, () => console.log(1))

