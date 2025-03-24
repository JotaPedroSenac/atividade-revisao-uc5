const { pool } = require('../../../config/database');

class ReservaModel{
    static async criar(usuario, sala, data_horario_inicio, data_horario_termino, status){
        const novaReserva = [ usuario, sala, data_horario_inicio, data_horario_termino, status ];
        const consulta = `insert into agenda (usuario, sala, data_horario_inicio, data_horario_termino, status) values ($1, $2, $3, $4, $5) returning * `
        await pool.query(consulta, novaReserva);
        return novaReserva.rows;
    }
    static async editar(id,usuario, sala, data_horario_inicio, data_horario_termino, status){
        const dados = [id,usuario, sala, data_horario_inicio, data_horario_termino, status];
        const consulta = `update agenda set usuario = $2, sala = $3, data_horario_inicio = $4, data_horario_termino = $5, status = $6 where id = $1 returning *`;
        const reservaAtualizada = await pool.query(consulta, dados);
        return reservaAtualizada.rows;
    }
    static async listar(){
        const consulta = `select * from agenda`;
        const reservas = await pool.query(consulta);
        return reservas.rows;
    }
    static async listarPorID(id){
        const dados = [id];
        const consulta = `select * from agenda where id = $1`;
        const reserva = await pool.query(consulta, dados);
        return reserva.rows;
    }
    static async excluirPorID(id){
        const dados = [id];
        const consulta = `delete from agenda where id = $1`;
        await pool.query(consulta, dados);
    }
    static async excluirTodos(){
        const consulta = `delete from agenda`;
        await pool.query(consulta);
    }
}

module.exports = ReservaModel;