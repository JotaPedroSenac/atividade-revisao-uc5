const { pool } = require('../../../config/database');

class ReservaModel{
    static async criarReserva(cliente_id, endereco_id, sala, data_horario_inicio, data_horario_termino, status){
        const dados = [cliente_id, endereco_id, sala, data_horario_inicio, data_horario_termino, status];
        const consulta = `insert into Coworking_Reserva(cliente_id, endereco_id, sala, data_horario_inicio, data_horario_termino, status) values ($1, $2, $3, $4, $5, $6 ) returning *`
        const resultado = pool.query(consulta, dados);
        return resultado.rows;
    }

    static async listar(){
        const consulta = `select * from Coworking_Reserva`;
        const resultado = await pool.query(consulta);
        return resultado.rows;
    }

    static async listarPorCliente(cliente_id){
        const dados = [cliente_id];
        const consulta = `select Coworking_Cliente.usuario, Coworking_Reserva.*
        from Coworking_Reserva
        join Coworking_Cliente on Coworking_Reserva.cliente_id = Coworking_Cliente.id
        where Coworking_Reserva.cliente_id = $1`
        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }

    static async listarPorCEP(cep){
        const dados = [cep];
        const consulta = `select Coworking_Cliente.usuario, Coworking_Reserva.*, Coworking_Endereco.*
        from Coworking_Reserva
        join Coworking_Cliente on Coworking_Reserva.cliente_id = Coworking_Cliente.id
        join Coworking_Endereco on Coworking_Reserva.endereco_id = Coworking_Endereco.id
        where Coworking_Endereco.cep = $1`
        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }

    static async listarPorSala(sala){
        const dados = [sala];
        const consulta = `select * from Coworking_Reserva where sala = $1`
        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }

    static async editar(cliente_id, endereco_id, sala, data_horario_inicio, data_horario_termino, status){
        const dados = [cliente_id, endereco_id, sala, data_horario_inicio, data_horario_termino, status];
        const consulta = `update Coworking_Reserva set endereco_id = $2, sala = $3, data_horario_inicio = $4, data_horario_termino = $5, status = $6
        where cliente_id = $1 returning *`
        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }

    static async deletar(cliente_id){
        const dados = [cliente_id];
        const consulta = `delete from Coworking_Reserva where cliente_id = $1`
        await pool.query(consulta, dados);
    }

    static async deletarTodos(){
        const consulta = `delete from Coworking_Reserva`;
        await pool.query(consulta);
    }
}

module.exports = ReservaModel;