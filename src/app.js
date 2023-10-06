
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;
const productRouter = require ('./Dao/routes/product.router')
const { productModel } = require('./Dao/models/product.model');
const userRouter = require ('./Dao/routes/user.router')
const { userModel } = require('./Dao/models/user.model');
const messageRouter = require ('./Dao/routes/message.routes')
const { messageModel } = require('./Dao/models/message.model');


app.listen (port, ()=> {
    console.log(`servidor corriendo en el puerto ${port}`)
})

app.use (express.json())
mongoose.connect("mongodb+srv://up:up123@cluster0.jh7kmjo.mongodb.net/?retryWrites=true&w=majority")

.then (() => {
    console.log ("conectado a la base")
})
.catch (error => {
    console.error ("error de conexión", error);
})

app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/messages", messageRouter)


/* const express = require("express");
const app = express();
const PORT = 8080;
const fs = require('fs');
const http = require('http');
const exphbs = require('express-handlebars');
const socketIo = require('socket.io');


 app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.set('view engine', 'handlebars');

const productosFilePath = './src/productos.json';
const carritosFilePath = './src/carrito.json';

let products = readProductsFromFile();
let carts = readCartsFromFile();

function readProductsFromFile() {
    try {
        const data = fs.readFileSync(productosFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error, no se pueden leer los productos', error);
        return [];
    }
}

function saveProductsToFile() {
    try {
        fs.writeFileSync(productosFilePath, JSON.stringify(products, null, 2), 'utf-8');
        console.log('Productos guardados con éxito');
    } catch (error) {
        console.error('Error, no se pueden guardar los productos', error);
    }
}

function readCartsFromFile() {
    try {
        const data = fs.readFileSync(carritosFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error, no se pueden leer los carritos', error);
        return [];
    }
}

function saveCartsToFile() {
    try {
        fs.writeFileSync(carritosFilePath, JSON.stringify(carts, null, 2), 'utf-8');
        console.log('Carritos guardados');
    } catch (error) {
        console.error('Error, no se pueden guardar los carritos', error);
    }
}


const server = http.createServer(app);
const io = socketIo(server);


const productNamespace = io.of('/products');

productNamespace.on('connection', (socket) => {
    console.log('Usuario conectado a la sala de productos');

    socket.on('disconnect', () => {
        console.log('Usuario desconectado de la sala de productos');
    });
});


app.get("/", (req, res) => {
    res.render("home", { products });  
});


app.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", { products }); 
});

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.post("/api/products", (req, res) => {
    const { id, title, description, code, price, estatus, stock, category } = req.body;
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        code,
        price,
        estatus,
        stock,
        category: category || "Nuevo producto"
    };
    products.push(newProduct);
    saveProductsToFile();

   
    productNamespace.emit('updateProductList', products);

    res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
        const { id, title, description, code, price, estatus, stock, category } = req.body;
        products[productIndex] = {
            ...products[productIndex],
            title,
            description,
            code,
            price,
            estatus,
            stock,
            category: category || products[productIndex].category
        };

        saveProductsToFile();

        
        productNamespace.emit('updateProductList', products);

        res.json(products[productIndex]);
    } else {
        res.status(404).json({ message: "Producto no encontrado" });
    }
});

app.delete("/api/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    products = products.filter((product) => product.id !== productId);
    saveProductsToFile();

    
    productNamespace.emit('updateProductList', products);

    res.json({ message: "Producto borrado exitosamente" });
});

app.post("/api/carts", (req, res) => {
    const newCartId = carts.length + 1;
    const newCart = { id: newCartId, products: [] };
    carts.push(newCart);
    saveCartsToFile();
    res.status(201).json(newCart);
});

app.get("/api/carts/:id", (req, res) => {
    const cartId = parseInt(req.params.id);
    const cart = carts.find((cart) => cart.id === cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(400).json({ message: "Carrito vacío" });
    }
});

app.post("/api/carts/:cid/product/:pid", (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const { quantity } = req.body;
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);

    if (cartIndex !== -1) {
        const productIndex = carts[cartIndex].products.findIndex((product) => product.product === productId);

        if (productIndex !== -1) {
            carts[cartIndex].products[productIndex].quantity += quantity || 1;
        } else {
            carts[cartIndex].products.push({ product: productId, quantity: quantity || 1 });
        }
        saveCartsToFile();
        res.json(carts[cartIndex]);
    } else {
        res.status(404).json({ message: "Carrito no encontrado" });
    }
});


server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
}); */

