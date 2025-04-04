const { pool } = require('../../../config/database');

class ClienteModel{
    static async criar(usuario){
        const novoUsuario = [usuario];
        const consulta = `insert into Coworking_Cliente (usuario) values ($1) returning * `
        await pool.query(consulta, novoUsuario);
        return novoUsuario.rows;
    }
    static async editar(id,usuario){
        const dados = [id,usuario];
        const consulta = `update Coworking_Cliente set usuario = $2 where id = $1 returning *`;
        const usuarioAtualizado = await pool.query(consulta, dados);
        return usuarioAtualizado.rows;
    }
    static async listar(){
        const consulta = `select * from Coworking_Cliente`;
        const usuarios = await pool.query(consulta);
        return usuarios.rows;
    }
    static async listarPorID(id){
        const dados = [id];
        const consulta = `select * from Coworking_Cliente where id = $1`;
        const usuario = await pool.query(consulta, dados);
        return usuario.rows;
    }
    static async excluirPorID(id){
        const dados = [id];
        const consulta = `delete from Coworking_Cliente where id = $1`;
        await pool.query(consulta, dados);
    }
    static async excluirTodos(){
        const consulta = `delete from Coworking_Cliente`;
        await pool.query(consulta);
    }
}

module.exports = ClienteModel;