const { pool } = require('../../../config/database');

class ClienteModel{
    static async criar(usuario){
        const novaReserva = [ usuario];
        const consulta = `insert into Cliente (usuario) values ($1) returning * `
        await pool.query(consulta, novaReserva);
        return novaReserva.rows;
    }
    static async editar(id,usuario){
        const dados = [id,usuario];
        const consulta = `update Cliente set usuario = $2 where id = $1 returning *`;
        const reservaAtualizada = await pool.query(consulta, dados);
        return reservaAtualizada.rows;
    }
    static async listar(){
        const consulta = `select * from Cliente`;
        const reservas = await pool.query(consulta);
        return reservas.rows;
    }
    static async listarPorID(id){
        const dados = [id];
        const consulta = `select * from Cliente where id = $1`;
        const reserva = await pool.query(consulta, dados);
        return reserva.rows;
    }
    static async excluirPorID(id){
        const dados = [id];
        const consulta = `delete from Cliente where id = $1`;
        await pool.query(consulta, dados);
    }
    static async excluirTodos(){
        const consulta = `delete from Cliente`;
        await pool.query(consulta);
    }
}

module.exports = ClienteModel;