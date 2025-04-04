const express = require('express');
const EnderecoController = require('../controllers/');
const router = express.Router();

router.post('/enderecos', EnderecoController.criar);
router.put('/endereco/:cliente_id', EnderecoController.editar);
router.get('/enderecos', EnderecoController.listar);
router.get('/endereco/cliente/:cliente_id', EnderecoController.listarPorCliente);
router.get('/endereco/cep/:cep', EnderecoController.listarPorCEP);
router.get('/endereco/cidade/:cidade', EnderecoController.listarPorCidade);

module.exports = router;