const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./src/modules/cliente/routes/');
const enderecoRoutes = require('./src/modules/endereco/routes/');
const reservaRoutes = require('./src/modules/reserva/routes');

dotenv.config();

const port = process.env.PORTA; 
const app = express();

app.use(express.json());

app.use(usuarioRoutes); 
app.use(enderecoRoutes);
app.use(reservaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
