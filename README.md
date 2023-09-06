CONFIGURAÇÃO PARA UTILIZAR O SISTEMA
-
- npm install express
- npm install express-handlebars
- npm install body-parser
- npm install sequelizes
- npm install mysql2



CRIAÇÃO DO BANCO DE DADOS PARA UTILIZAR O SISTEMA
-
- Crie um arquivo chamado db.js para criar a coneção com o banco de dados em sequelize
```
const Sequelize = require('sequelize')
const sequelize = new Sequelize('nome do banco', 'nome do user', 'senha', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
```
- Crie um arquivo chamado Post.js onde sera criado a tabela com as colunas necessario
```
const db = require('./db')
const post = db.sequelize.define('users', {
    nome: {
        type: db.Sequelize.TEXT
    },
    email: {
        type: db.Sequelize.TEXT
    },
    senha: {
        type: db.Sequelize.TEXT
    },
    numero: {
        type: db.Sequelize.TEXT,
    }
}, {
    timestamps: false
})
module.exports = post
```
