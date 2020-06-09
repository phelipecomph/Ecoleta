// import
const sqlite3 = require("sqlite3").verbose()

// criar objeto que fara operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")


module.exports = db
// utilizar o objeto db para nossas operações
db.serialize(() => {
    //Criar tabela com SQL
    db.run(`
        CREATE TABLE IF NOT EXISTS points (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

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
        "https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    // db.run(query, values, afterInsertData)

    //consultar dados da tabela com SQL
    // db.all(`SELECT id FROM points`, function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     } 
    //     console.log("Aqui esão seus registros: ")
    //     console.log(rows)
    // })

    //Deletar um dado da tabela com SQL
    // db.run(`DELETE FROM points WHERE id = ?`, [8], function(err){
    //     if(err){
    //         return console.log(err)
    //     } 
    //     console.log("Registro deletado com sucesso")
    // })
})