const ReservaModel = require('../models/index');

class ReservaController{
    static async criar(req, res){
        try {
            const { usuario, sala, data_horario_inicio, data_horario_termino, status } = req.body;
            if (!usuario || !sala || !data_horario_inicio || !data_horario_termino || !status) {
                return res.status(200).json({ mensagem: "todos os dados devem ser informados" })
            }
            const novaReserva = await ReservaModel.criar(usuario, sala, data_horario_inicio, data_horario_termino, status);
            res.status(201).json({ mensagem: "Reserva criada com sucesso", reserva: novaReserva });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar reserva!", erro: error.message })
        }
    }
    static async editar(req, res){
        try {

        } catch (error) {

        }
    }
    static async listar(req, res){
        try {

        } catch (error) {

        }
    }
    static async listarPorID(req, res){
        try {

        } catch (error) {

        }
    }
    static async excluirPorID(req, res){
        try {

        } catch (error) {

        }
    }
    static async excluirTodos(req, res){
        try {

        } catch (error) {

        }
    }
}

module.exports = ReservaController;