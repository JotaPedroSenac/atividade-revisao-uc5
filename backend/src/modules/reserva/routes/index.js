const express = require('express');
const ReservaController = require('../controllers/index');

const router = express.Router();

router.get('/agendas', ReservaController.listar);
router.post('/agendas', ReservaController.criar);
router.put('/agenda/:id', ReservaController.editar);
router.delete('/agenda/:id', ReservaController.excluirPorID);
router.delete('/agendas', ReservaController.excluirTodos);
router.get('/agenda/:id', ReservaController.listarPorID);

module.exports = router;