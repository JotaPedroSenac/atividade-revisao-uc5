const express = require('express');
const ClienteController = require('../controllers/');

const router = express.Router();

router.get('/usuarios', ClienteController.listar);
router.post('/usuarios', ClienteController.criar);
router.put('/usuario/:id', ClienteController.editar);
router.delete('/usuario/:id', ClienteController.excluirPorID);
router.delete('/usuarios', ClienteController.excluirTodos);
router.get('/usuario/:id', ClienteController.listarPorID);

module.exports = router;