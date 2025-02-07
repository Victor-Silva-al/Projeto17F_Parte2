const express =require('express')
const mysql =require('mysql2')
const axios =require('axios')
const app = express()
const port = 3000

app.use(express.json());
 
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  let name = "Roberto";
  let compras = ["morango", "ice Tea", "iogurte"];
  res.render('compras', { nameOfTheClient: name, listacompra: compras});
})

app.post('/nova-compras', (req, res) => {
  const lista = req.body.listacompra;
  res.send(lista);
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})