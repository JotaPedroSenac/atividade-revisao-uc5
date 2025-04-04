const express = require('express');
const router = express.Router();
const ReservaController = require('../../reserva/controllers');

router.post('/reserva', ReservaController.criar);
router.get('/reservas', ReservaController.listar);
router.get('/reserva/cliente/:cliente_id', ReservaController.listarPorCliente);
router.get('/reserva/cep/:cep', ReservaController.listarPorCEP);
router.get('/reserva/sala/:sala', ReservaController.listarPorSala);
router.put('/reserva/:cliente_id', ReservaController.editar);
router.delete('/reserva/:cliente_id', ReservaController.deletar);
router.delete('/reserva/', ReservaController.deletarTodos);


module.exports = router;