const express = require('express')
const app = express()
const post = require('./models/post')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')




const handle = handlebars.create({
    defaultLayout: 'main'
})

app.engine('handlebars', handle.engine)
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

async function updateUserName(userId, newNome, newEmail) {
  try {
    const [updatedRowsCount, updatedRows] = await post.update(
      {
        nome: newNome,
        email: newEmail
      },
      {
        where: {
          id: userId,
        },
      }
    );
  } catch (error) {
    res.send('Erro ao atualizar registros:', error);
  }
}

const updateSenha = async(userId, senha) =>{
try {
  const [updatedRowsCount, updatedRows] = await post.update(
    {
      senha: senha
    },
    {
      where: {
        id: userId,
      },
    }
  );
} catch (error) {
  res.send('Erro ao atualizar registros:', error);
}
}



app.get('/cadastrar',(req,res)=>{
    res.render('cadastrar.handlebars')
})



app.post('/add',async(req,res)=>{
    const emailCadastro = await post.findOne({
      where: {
        email: req.body.email
      }
    })
    post.create({
      nome: req.body.name,
      email: req.body.email,
      senha: req.body.senha,
      numero: req.body.numero
    }).then(
        res.redirect('/')
    ).catch((error) => {
        res.send(error)
    })
})


app.get('/', (req, res) =>{
    post.findAll().then((p)=>{
        res.render('home.handlebars', {p:p})
    })
})


app.get('/delet/:id', (req,res)=>{
    post.destroy({where: {'id': req.params.id}}).then(
        res.redirect('/')
    ).catch((erro)=>{
        res.send('erro para apagar')
    })
})


app.get('/editar/:id', (req, res) =>{
    post.findAll({where: {'id': req.params.id}}).then((p)=>{
        res.render('update.handlebars', {nome: p} )
    })
    
})

app.post('/att/:id',(req,res)=>{
    updateUserName(req.params.id, req.body.name, req.body.email).then(
        res.redirect('/')
    )
})


app.get('/esqueciasenha/:id', (req, res)=>{
    res.render('esqueciasenha.handlebars', {id: req.params.id})
})


app.post('/alterarsenha/:id', (req, res)=>{
  if(req.body.senha1 == req.body.senha2){
    updateSenha(req.params.id, req.body.senha1).then(
      res.redirect('/')
    )
  }else{
    //erro
    res.redirect(`/esqueciasenha/${req.params.id}`)
  }
})


app.get('/perfil/:id', (req, res)=>{
  console.log(logado)
  post.findAll({where: {'id': req.params.id}}).then((p)=>{
    res.render('perfil.handlebars', {nome: p} )
})
})


app.listen(8081, ()=>{
    console.log('porta: 8081')
})