const express = require('express');
const dotenv = require('dotenv');
const { pool } = require('./src/config/database');
dotenv.config();
const port = process.env.PORTA
const app = express();
app.use(express.json());


// listar reservas
app.get('/reservas', async(req, res) => {
    try {

        const consulta = `select * from agenda`
        const reservas = await pool.query(consulta);
        if (reservas.rows.length === 0) {
            return res.status(200).json({ mensagem: "Banco de dados vazio" });
        }

        res.status(200).json(reservas.rows);

    } catch (error) {
        res.status(500).json(
            {
              msg: "Erro ao buscar reserva",
              erro: error.message
            }
        );
    }
});

// listar reserva por id

app.get('/reservas/:id', async(req, res) => {
    try {

        const id = req.params.id;
        if (!id) {
            return res.status(404).json({mensagem: "Informe o id"})
        }

        const parametro = [id];
      
        const consulta = `select * from agenda where id = $1`;
        const reservas = await pool.query(consulta, parametro);
        if (reservas.rows.length === 0) {
            return res.status(200).json({ mensagem: "Banco de dados vazio" });
        }

        res.status(200).json(reservas.rows);

    } catch (error) {
        res.status(500).json(
            {
              msg: "Erro ao buscar reserva",
              erro: error.mensagem
            }
        );
    }
});

// criar nova reserva

app.post('/reservas', async (req, res) => {
    try {
        const { usuario, sala, data_horario_inicio, data_horario_termino, status } = req.body;

        if (!usuario || !sala || !data_horario_inicio || !data_horario_termino || !status) {
            return res.status(200).json({ mensagem: "todos os dados devem ser informados" })
        }
        
        const novaReserva = [ usuario, sala, data_horario_inicio, data_horario_termino, status ];
        const consulta = `insert into agenda (usuario, sala, data_horario_inicio, data_horario_termino, status) values ($1, $2, $3, $4, $5) returning * `

        await pool.query(consulta, novaReserva);

        res.status(201).json({ mensagem: "Reserva feita com sucesso!" });
    } catch (error) {
        res.status(500).json(
            {
              msg: "Erro ao fazer reserva",
              erro: error.message
            }
        );
    }
})

// atualizar horário ou mudar status

app.put('/reservas/:id', async(req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({mensagem: "Informe o id"})
        }
      
        const {novoHorario, novoStatus} = req.body;

        const parametro = [id];
        const consulta = `select * from agenda where id=$1`;
        const resultado = await pool.query(consulta, parametro);

        if(resultado.rows.length === 0){
            return resposta.status(404).json({mensagem: "Produto não encontrado"})
        }

        const dados = [id, novoHorario, novoStatus];
        const consulta2 = `update agenda set data_horario_inicio = $2, status = $3 where id = $1 returning *`;

        await pool.query(consulta2, dados)


        res.status(200).json({msg: "Reserva atualizada com sucesso"});

    } catch (error) {
        res.status(500).json(
            {
              msg: "Erro ao atualizar reserva",
              erro: error.message
            }
          );
    }
});

// Deletar reserva

app.delete('/reservas/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const parametro = [id];
        const consulta = `select * from agenda where id=$1`;
        const resultado = await pool.query(consulta, parametro);

        if (resultado.rows.length === 0) {
        return res.status(404).json({mensagem: "Reserva não encontrado"});
        }

        const consulta2 = `delete from agenda where id = $1`;
        
        await pool.query(consulta2, parametro);

        res.status(200).json({mensagem: "reserva deletada com sucesso"})

    } catch (error) {
        res.status(500).json(
            {
              msg: "Erro ao deletar reserva",
              erro: error.message
            }
          );
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });