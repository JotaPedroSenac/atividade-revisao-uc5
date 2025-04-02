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
            res.status(500).json({ mensagem: "Erro ao cadastrar Cliente!", erro: error.message })
        }
    }
    static async editar(req, res){
        try {
            const id = req.params.id;
            const { usuario, sala, data_horario_inicio, data_horario_termino, status } = req.body;
            if (!usuario || !sala || !data_horario_inicio || !data_horario_termino || !status) {
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const reservaEditada = await ReservaModel.editar(id, usuario, sala, data_horario_inicio, data_horario_termino, status);
            if(reservaEditada.length === 0){
                return res.status(400).json({mensagem: "A reserva está errada ou não existe"});
            }
            res.status(201).json({mensagem: "Reserva editada com sucesso", reserva: reservaEditada});
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao editar a reserva!", erro: error.message})
        }
    }
    static async listar(req, res){
        try {
            const reservas = await ReservaModel.listar();
            if (reservas.length === 0) {
                return res.status(400).json({ mensagem: "Banco de dados vazio" });
            }
            res.status(200).json(reservas);
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao listar reservas!", erro: error.message})
        }
    }
    static async listarPorID(req, res){
        try {
            const id = req.params.id;
            const reserva = await ReservaModel.listarPorID(id);
            if (reserva.length === 0) {
                return res.status(400).json({ mensagem: "Reserva não encontrada" });
            }
            res.status(200).json(reserva);
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao listar reserva!", erro: error.message})
        }
    }
    static async excluirPorID(req, res){
        try {
            const id = req.params.id;
            const reserva = await ReservaModel.listarPorID(id);
            if (!reserva) {
                return res.status(400).json({ mensagem: "reserva não encontrada" });
            }
            await ReservaModel.excluirPorID(id);
            res.status(200).json({mensagem: "reserva deletada com sucesso"});
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao deletar reserva!", erro: error.message});
        }
    }
    static async excluirTodos(req, res){
        try {
            await ReservaModel.excluirTodos();
            res.status(200).json({mensagem: "Todos as reservas foram deletadas"});
        } catch (error) {
            res.status(500).json({mensagem: "Erro ao deletar reservas!", erro: error.message});
        }
    }
}

module.exports = ClienteController;