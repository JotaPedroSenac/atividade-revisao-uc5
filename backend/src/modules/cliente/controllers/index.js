const ClienteModel = require('../models/index');

class ClienteController{
    static async criar(req, res){
        try {
            const { usuario } = req.body;
            if (!usuario) {
                return res.status(200).json({ mensagem: "todos os dados devem ser informados" })
            }
            const novoCliente = await ClienteModel.criar(usuario);
            res.status(201).json({ mensagem: "Cliente criado com sucesso", cliente: novoCliente });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message })
        }
    }
    static async editar(req, res){
        try {
            const id = req.params.id;
            const { usuario } = req.body;
            if (!usuario) {
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const usuarioEditado = await ClienteModel.editar(id, usuario);
            if(usuarioEditado.length === 0){
                return res.status(400).json({mensagem: "O usuário está errada ou não existe"});
            }
            res.status(201).json({mensagem: "Usuário editada com sucesso", usuario: usuarioEditado});
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message})
        }
    }
    static async listar(req, res){
        try {
            const usuarios = await ClienteModel.listar();
            if (usuarios.length === 0) {
                return res.status(400).json({ mensagem: "Banco de dados vazio" });
            }
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message})
        }
    }
    static async listarPorID(req, res){
        try {
            const id = req.params.id;
            const usuario = await ClienteModel.listarPorID(id);
            if (usuario.length === 0) {
                return res.status(400).json({ mensagem: "Usuário não encontrado" });
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message})
        }
    }
    static async excluirPorID(req, res){
        try {
            const id = req.params.id;
            const usuario = await ClienteModel.listarPorID(id);
            if (!usuario) {
                return res.status(400).json({ mensagem: "usuario não encontrado" });
            }
            await ClienteModel.excluirPorID(id);
            res.status(200).json({mensagem: "usuario deletado com sucesso"});
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }
    static async excluirTodos(req, res){
        try {
            await ClienteModel.excluirTodos();
            res.status(200).json({mensagem: "Todos os usuários foram deletadas"});
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }
}

module.exports = ClienteController;