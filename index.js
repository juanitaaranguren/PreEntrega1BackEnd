const express = require ("express")
const app = express ()
const port = 8080

app.listen (port, () => {
    console.log ("servidor escuchando")
})

app.use (express.json)
mongoose.connect ("mongodb+srv://juanitaranguren:trasformes@cluster0.jtg1skd.mongodb.net/?retryWrites=true&w=majority")
.then (()=> {
    console.log ("conectado")
})
.catch (error=> {
    console.error ("error de bs", error)
})
