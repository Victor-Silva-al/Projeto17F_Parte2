const express =require('express')
const mysql =require('mysql2')
const axios =require('axios')
const app = express()
const port = 21122
const NOME_TABELA = "songs"

app.use(express.json());
 
app.set('view engine', 'ejs');

const connection = mysql.createConnection({
  host: 'vh-jalin-rabey.c.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_GJQu1pmuO6-U2A-u8Ir',
  database: 'create_songs'
})

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar à base de dados:', err.message);
  } else {
    console.log('Conectado à base de dados MySQL!');
  }
});

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/new-song', (req, res) => {
  res.render('adicionar_musicas');
}) 

app.post('/new-song', (req, res) => {
  const {title, artist, album, genre, duration_seconds, release_date, likes, spotify_link} = req.body;

  if (!title || !artist || !album || !genre || !duration_seconds || !release_date || !likes || !spotify_link) {
    return res.status(400).send('Campos obrigatórios: title, artist, album, genre, duration_seconds, release_date, likes, spotify_link');
  }

  const query = `INSERT INTO ${NOME_TABELA} (title, artist, album, genre, duration_seconds, release_date, likes, spotify_link) VALUES ("${title}", "${artist}", "${album}", "${genre}", "${duration_seconds}", "${release_date}", "${likes}", "${spotify_link}")`;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao adicionar música: ' + err.message);
    }
    res.sendStatus(200);
  });

})

app.get('/api/songs', (req, res) => {
  connection.query(`SELECT * FROM ${NOME_TABELA}`, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar músicas: ' + err.message);
    }
    res.json(results);
  });
})

app.get('/songs', (req, res) => {
  axios.get(`http://localhost:3000/api/songs`)
  .then(response =>{
    console.log('Success:',response.data);
    res.render('songs',{song:response.data})
  })
  .catch((error)=>{
    console.error('Error',error);
  });

});

app.get('/api/songs/:id', (req, res) => {

  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).send('ID da música não é válido');
  }

  const myQuery = `SELECT * FROM ${NOME_TABELA} WHERE id=${id}`;

  connection.query(myQuery, (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao buscar música: ' + err.message);
      }
      if (results.length == 0) {
        return res.status(404).send('Música não encontrada');
      }
      res.json(results);
  });
  
});

app.get('/songs/:id', (req, res) => {
  const id = req.params.id;
  axios.get(`http://localhost:3000/api/songs/${id}`)
  .then(response =>{
    if (response.data.length === 0) {
      return res.redirect('/');
    }
    console.log('Success:',response.data);
    res.render('song',{song:response.data, price:pricePerLike})
  })
  .catch((error)=>{
    console.error('Error',error);
    res.redirect('/');
  });

});

app.put('/api/songs/:id', (req, res) => {
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).send('ID da música não é válido');
  }

  const {title, artist, album, genre, duration_seconds, release_date, likes, spotify_link} = req.body;

  if (!title || !artist) {
    return res.status(400).send('Campos obrigatórios: title, artist');
  }

  const query = `UPDATE ${NOME_TABELA} SET title = "${title}", artist = "${artist}", album = "${album}", genre = "${genre}", duration_seconds = "${duration_seconds}", release_date = "${release_date}", likes = "${likes}", spotify_link = "${spotify_link}" WHERE id = "${id}"`;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar música: ' + err.message);
    }
    res.sendStatus(200);
  });
});

app.put('/songs/:id', (req, res) => {
  const id = req.params.id;
  const {title, artist, album, genre, duration_seconds, release_date, likes, spotify_link} = req.body;

  axios.put(`http://localhost:3000/api/songs/${id}`,{
    title: title,
    artist: artist,
    album: album,
    genre: genre,
    duration_seconds: duration_seconds,
    release_date: release_date,
    likes: likes,
    spotify_link: spotify_link
  })
  .then(response =>{
    console.log('Success:',response.data);
    console.log('spotify_link:',spotify_link);
    res.send('Sucesso ao atualizar música')
  })
  .catch((error)=>{
    console.error('Error',error);
  });

});

app.delete('/api/songs/:id', (req, res) => {
  const id = req.params.id;

  if (!id || isNaN(id)) {
    return res.status(400).send('ID da música não é válido');
  }

  const myQuery = `DELETE FROM ${NOME_TABELA} WHERE id=${id}`;

  connection.query(myQuery, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao deletar música: ' + err.message);
    }
    res.sendStatus(200);
  });
});

app.delete('/songs/:id', (req, res) => {
  const id = req.params.id;
  axios.delete(`http://localhost:3000/api/songs/${id}`)
  .then(response =>{
    console.log('Success:',response.data);
    res.send('Música removida com sucesso')
  })
  .catch((error)=>{
    console.error('Error',error);
  });

});

let pricePerLike = 0.2;

app.get('/api/price', (req, res) => {
  res.json(pricePerLike);  
});

app.get('/price', (req, res) => {
  axios.get(`http://localhost:3000/api/price`)
  .then(response =>{
    console.log('Success:',response.data);
    res.render('price',{price:response.data})
  })
  .catch((error)=>{
    console.error('Error',error);
  });

});
app.put('/price', (req, res) => {
  if (!req.body.price) {
    return res.status(400).send('Preço por like não foi fornecido');
  } else if (isNaN(req.body.price)) {
    return res.status(400).send('Preço por like deve ser um número');
  } else if (req.body.price < 0) {
    return res.status(400).send('Preço por like deve ser um número positivo');
  }

  pricePerLike = req.body.price

  res.sendStatus(200);  
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
