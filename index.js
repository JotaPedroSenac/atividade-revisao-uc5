const express = require('express');
const dotenv = require('dotenv');
const reservaRoutes = require('./src/modules/reserva/routes/index');

dotenv.config();

const port = process.env.PORTA; 
const app = express();

app.use(express.json());

app.use(reservaRoutes); 

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
