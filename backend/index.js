const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./src/modules/cliente/routes/');

dotenv.config();

const port = process.env.PORTA; 
const app = express();

app.use(express.json());

app.use(usuarioRoutes); 

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
