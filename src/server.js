const express = require("express")
const server = express()

// importar banco de dados
const db = require("./database/db") //db == db.js

//configurar pasta publica
server.use(express.static("public"))

//Habilitar req.body na nossa aplicacao
server.use(express.urlencoded({extended: true}))

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

    //query strings da url
    //req.query

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    req.body
    //Inserir dados na tabela com SQL
    const query = `
        INSERT INTO points (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.iCity,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err){
            console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true});
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {
    const search = req.query.search

    if(search == ""){
        //mostrar a pagina html com os dados do db
        return res.render("search-results.html", {total: 0})
    }

    // pegar os dados do db
    db.all(`SELECT * FROM points WHERE city = '${search}'`, function(err, rows){
        if(err){
            return console.log(err)
        } 
        const total = rows.length
        //mostrar a pagina html com os dados do db
        return res.render("search-results.html", {points: rows, total}) // total:total == total
    })

    
})

//ligar o servidor
console.log("Server ligado")
server.listen(5500)