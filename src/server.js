const express = require("express")
const server = express()

//configurar pasta publica
server.use(express.static("public"))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})


//configurar caminhos da minha aplicacao
//pagina inicial
//req: requisição
//res: resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})
server.get("/create", (req, res) => {
    return res.render("create-point.html")
})
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//ligar o servidor
console.log("Server ligado")
server.listen(5500)