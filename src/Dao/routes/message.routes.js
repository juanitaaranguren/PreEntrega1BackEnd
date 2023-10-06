const { Router } = require('express');
const { messageModel } = require('../models/message.model');

const router = Router();

router.get('/', async (req, res) => { 
    try {
        let messages = await messageModel.find();
        res.send({ result: "success", payload: messages });
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    let { user, message} = req.body;

    if (!user || !message) {
        res.send({ status: "error", error: "faltan datos" });
    }

    let result = await messageModel.create({ user, message});
    res.send({ result: "success", payload: result });
});

router.put('/:uid', async (req, res) => {
    let { uid } = req.params;

    let messageToReplace = req.body;
    if (!messageToReplace.user|| !messageToReplace.message) {
        res.send({ status: "error", error: "faltan datos" });
    }
    let result = await messageModel.updateOne({ _id: uid }, messageToReplace);
    res.send({ result: "success", payload: result });
});


router.delete('/:uid', async (req, res) => {
    let { uid } = req.params;
    let result = await messageModel.deleteOne({ _id: uid });
    res.send({ result: "success", payload: result });
});


module.exports = router;