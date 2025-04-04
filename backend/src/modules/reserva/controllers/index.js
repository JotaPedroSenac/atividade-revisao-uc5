const ReservaModel = require('../../reserva/models/index');

class ReservaController{
    static async criar(req, res){
        try {
            const {cliente_id, endereco_id, sala, data_horario_inicio, data_horario_termino, status} = req.body;
            if (!cliente_id || !endereco_id || !sala || !data_horario_inicio || !data_horario_termino || !status) {
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const novaReserva= await ReservaModel.criarReserva(cliente_id, endereco_id, sala, data_horario_inicio, data_horario_termino, status);
            res.status(201).json({mensagem: "Reserva feita com sucesso", reserva: novaReserva});
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }

    }

    static async listar(req, res){
        try {
            const reservas = await ReservaModel.listar();
            if(reservas.length === 0){
                return res.status(400).json({mensagem: "Não há registros a serem exibidos"});
            }
            res.status(200).json(reservas);
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }

    static async listarPorCliente(req, res){
        try {
            const { cliente_id } = req.params;
            if (!cliente_id) {
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const reservas = await ReservaModel.listarPorCliente(cliente_id);
            if (reservas.length === 0) {
                return res.status(400).json({mensagem: "Não há registros a serem exibidos"});
            }
            res.status(200).json(reservas);
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }

    static async listarPorCEP(req, res){
        try {
            const { cep } = req.params;
            if (!cep) {
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const reservas = await ReservaModel.listarPorCEP(cep);
            res.status(200).json(reservas);
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }

    static async listarPorSala(req, res){
        try {
            const { sala } = req.params;
            if (!sala) {
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const reservas = await ReservaModel.listarPorSala(sala);
            res.status(200).json(reservas);
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }

    static async editar(req, res){
        try {
            const {cliente_id} = req.params;
            const { endereco_id, sala, data_horario_inicio, data_horario_termino, status } = req.body
            if (!cliente_id || !endereco_id || !sala || !data_horario_inicio || !data_horario_termino || !status) {
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const reservaEditada = await ReservaModel.editar(cliente_id, endereco_id, sala, data_horario_inicio, data_horario_termino, status);
            if(reservaEditada.length === 0){
                return res.satus(400).json({mensagem: "Cliente está errado ou não existe"})
            }
            res.status(201).json({mensagem: "reserva atualizado com sucesso", reserva: reservaEditada });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }

    static async deletar(req, res){
        try {
            const {cliente_id} = req.params;
            const reserva = await ReservaModel.listarPorCliente(cliente_id);
            if (!reserva) {
                return res.status(400).json({ mensagem: "reserva não encontrada" });
            }
            await ReservaModel.deletar(cliente_id);
            res.status(200).json({mensagem: "Reserva deletada com sucesso"});
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }

    static async deletarTodos(req, res){
        try {
            await ReservaModel.deletarTodos();
            res.status(200).json({mensagem: "Todos as reservas foram deletadas"});
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }
}

module.exports = ReservaController;