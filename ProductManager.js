
import fs from "fs"
const filename = "./Productos.json"

class ProductManager{
    constructor(filename)
    {
        this.products = []
        if(fs.existsSync(filename)) this.products = JSON.parse(fs.readFileSync(filename,"utf-8"))
    }

    async getProducts()
    {
        if(fs.existsSync(filename)) return await JSON.parse(fs.readFileSync(filename,"utf-8"))
        return await this.products
    }

    addProduct(title, description, price, thumbnail, code, stock)
    {
        let productsList = [...this.products]
        let productRepeated
        productsList.forEach((product) =>{
            if(product.code === code) return productRepeated = product            
        })

        if(productRepeated !== undefined) return console.log(`El producto llamado ${productRepeated.title} con codigo ${productRepeated.code} esta repetido y no se pudo agregar`)

        let product =
        {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        

        product["id"] = 0
        if(this.products.length > 0) product["id"] = this.products.length
        
        this.products.push(product)
        fs.writeFileSync(filename, JSON.stringify(this.products,null,"\t"))
        
    }

    async getProductById(id)
    {      
        let productFound = this.products.find(product => product.id === id)
        if(productFound !== undefined) return await productFound
        console.log("Producto No Encontrado")
    }

    deleteProduct(idToDelete)
    {
        let product = this.getProductById(idToDelete)
        if(product === undefined) return
        let productId = this.products.findIndex(product => product.id === idToDelete)        
        this.arrayArrange(productId)
        fs.writeFileSync(filename, JSON.stringify(this.products,null,"\t"))
    }

    arrayArrange(idToStart)
    {
        let productsReorderList = this.products.filter(product => product.id > idToStart)
        this.products.splice(idToStart)
        
        for (let i = 0; i < productsReorderList.length; i++) 
        {
            productsReorderList[i].id = idToStart + i
            this.products.push(productsReorderList[i])
        }
    }
    
    updateProduct(idToDelete, title, description, price, thumbnail, code, stock)
    {
        let product = this.getProductById(idToDelete)
        if(product === undefined) return
        product.title = title
        product.description = description
        product.price = price
        product.thumbnail = thumbnail
        product.code = code
        product.stock = stock

        fs.writeFileSync(filename, JSON.stringify(this.products,null,"\t"))
    }
}

/*

//INSTANCIA DE PRODUCTMANAGER
let productManager = new ProductManager(filename)




productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin Imagen","Eldiego",25)
productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin Imagen","Messi",25)
productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin Imagen","Mascherano",25)

productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin Imagen","DiMaria",25)
productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin Imagen","DePaul",25)
productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin Imagen","Tagliafito",25)



productManager.updateProduct(1,"producto sobreescrito","Este es un producto cambiado",100,"Con Imagen","Eldibu",25)
console.log (productManager.getProducts())
console.log(productManager.getProductById(3))
productManager.deleteProduct(3)
console.log (productManager.getProducts())
*/

export default new ProductManager()

