const EnderecoModel = require('../models/index');

class EnderecoController{
    static async criar(req, res){
        try {
            const {cliente_id, cep, numero, ponto_referencia} = req.body;
            if( !cliente_id || !cep || !numero || !ponto_referencia ){
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const novoEndereco = await EnderecoModel.criar(cliente_id, cep, numero, ponto_referencia);
            res.status(201).json({mensagem: "Endereço criado com sucesso", endereco: novoEndereco});
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }

    static async editar(req, res){
        try {
            const { cliente_id } = req.params;
            const {cep, numero, ponto_referencia} = req.body;
            if( !cliente_id || !cep || !numero ){
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const enderecoAtualizado = await EnderecoModel.editar(cliente_id, cep, numero, ponto_referencia);
                if(enderecoAtualizado.length === 0){
                    return res.satus(400).json({mensagem: "Cliente está errado ou não existe"})
                }
            res.status(201).json({mensagem: "Endereço atualizado com sucesso", endereco: enderecoAtualizado });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }

    static async listar(req, res){
        try {
            const enderecos = await EnderecoModel.listar();
            if(enderecos.length === 0){
                return res.status(400).json({mensagem: "Não há registros a serem exibidos"});
            }
            res.status(200).json(enderecos);
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message});
        }
    }

    static async listarPorCliente(req, res){
        try {
            const { cliente_id } = req.params;
            if( !cliente_id ){
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const endereco = await EnderecoModel.listarPorCliente(cliente_id);
            if (endereco.length === 0) {
                return res.status(400).json({mensagem: "Não há registros a serem exibidos"});
            }
            res.status(200).json(endereco);
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message})
        }
    }

    static async listarPorCEP(req, res){
        try {
            const { cep } = req.params;
            if( !cep ){
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const endereco = await EnderecoModel.listarPorCEP(cep);
            if (endereco.length === 0) {
                return res.status(400).json({mensagem: "Não há registros a serem exibidos"});
            }
            res.status(200).json(endereco);
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message})
        }
    }

    static async listarPorCidade(req, res){
        try {
            const { cidade } = req.params;
            if( !cidade ){
                return res.status(400).json({mensagem: "Todos os campos devem ser preenchidos"});
            }
            const endereco = await EnderecoModel.listarPorCidade(cidade);
            if (endereco.length === 0) {
                return res.status(400).json({mensagem: "Não há registros a serem exibidos"});
            }
            res.status(200).json(endereco);
        } catch (error) {
            res.status(500).json({mensagem: "Erro interno do servidor, tente novamente mais tarde!", erro: error.message})
        }
    }
}

module.exports = EnderecoController;