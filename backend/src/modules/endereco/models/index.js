const { pool } = require('../../../config/database');
const axios = require('axios');

class EnderecoModel{
    static async criar(cliente_id, cep, numero, ponto_referencia){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data;
        const dados = [
            cliente_id,
            cep, 
            logradouro,
            numero,
            bairro, 
            complemento,
            uf,
            localidade,
            ponto_referencia
        ]

        const consulta = `insert into Coworking_Endereco(cliente_id, cep, logradouro, numero, complemento, bairro, localidade, uf, ponto_referencia)
        values($1, $2, $3, $4, $6, $5, $8, $7, $9) returning *`;

        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }

    static async editar(cliente_id, cep, numero, ponto_referencia){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data;
        const dados = [
            cep, 
            logradouro,
            numero,
            bairro, 
            complemento,
            uf,
            localidade,
            ponto_referencia,
            cliente_id
        ]

        const consulta = `update Coworking_Endereco set cep = $1, logradouro = $2, numero = $3, complemento = $5, bairro = $4, localidade = $7, 
        uf = $6, ponto_referencia = $8
        where cliente_id = $9 returning *`;

        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }

    static async listar(){
        const consulta = `select * from Coworking_Endereco`
        const resultado = await pool.query(consulta);
        return resultado.rows
    }

    static async listarPorCliente(cliente_id){
        const dados = [cliente_id];
        const consulta = `select Coworking_Cliente.*, Coworking_Endereco.*
         from Coworking_Cliente
         join Coworking_Endereco on Coworking_Cliente.id = Coworking_Endereco.cliente_id
         where Coworking_Cliente.id = $1`
        const resultado = await pool.query(consulta, dados);
        return resultado.rows
    }

    static async listarPorCEP(cep){
        const dados = [cep];
        const consulta = `select * from Coworking_Endereco where cep = $1`
        const resultado = await pool.query(consulta, dados);
        return resultado.rows
    }

    static async listarPorCidade(cidade){
        const dados = [`%${cidade}%`];
        const consulta = `select * from Coworking_Endereco where lower(localidade) like lower($1)`
        const resultado = await pool.query(consulta, dados);
        return resultado.rows
    }

}

module.exports = EnderecoModel;