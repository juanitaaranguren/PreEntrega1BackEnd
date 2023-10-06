const { Router } = require('express');
const { productModel } = require('../models/product.model');

const router = Router();

router.get('/', async (req, res) => { 
    try {
        let products = await productModel.find();
        res.send({ result: "success", payload: products });
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    let { id, title, description, code, price, estatus, stock, category} = req.body;

    if (!id || !title || !description || !price || !estatus || !stock || !category) {
        res.send({ status: "error", error: "faltan datos" });
    }

    let result = await productModel.create({ id, title, description, code, price, estatus, stock, category});
    res.send({ result: "success", payload: result });
});

router.put('/:uid', async (req, res) => {
    let { uid } = req.params;

    let productToReplace = req.body;
    if (!productToReplace.id|| !productToReplace.title || !productToReplace.description
        || !productToReplace.price || !productToReplace.estatus || !productToReplace.stock || !productToReplace.category) {
        res.send({ status: "error", error: "faltan datos" });
    }
    let result = await productModel.updateOne({ _id: uid }, productToReplace);
    res.send({ result: "success", payload: result });
});


router.delete('/:uid', async (req, res) => {
    let { uid } = req.params;
    let result = await productModel.deleteOne({ _id: uid });
    res.send({ result: "success", payload: result });
});


module.exports = router;