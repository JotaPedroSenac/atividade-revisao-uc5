const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORTA
const app = express();
app.use(express.json());

// banco de dados
const bd_reservas = [];

// listar reservas
app.get('/reservas', (req, res) => {
    try {
        if (bd_reservas.length === 0) {
            return res.status(200).json({ mensagem: "Banco de dados vazio" });
        }

        res.status(200).json(bd_reservas);

    } catch (error) {
        res.status(500).json(
            {
              msg: "Erro ao buscar reserva",
              erro: error.mensagem
            }
        );
    }
});

// listar reserva por id

app.get('/reservas/:id', (req, res) => {
    try {
        const id = req.params.id;
        const reservas = bd_reservas.find(reserva => reserva.id === id);

        if (!reservas) {
            return res.status(404).json({mensagem: "Reserva não encontrada"});
        }

        res.status(200).json(reservas);

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

app.post('/reservas', (req, res) => {
    try {
        const { id, usuario, sala, data_horario_inicio, data_horario_termino, status } = req.body;
        if (!id || !usuario || !sala || !data_horario_inicio || !data_horario_termino || !status) {
            return res.status(200).json({ mensagem: "todos os dados devem ser informados" })
        }
        const novaReserva = { id, usuario, sala, data_horario_inicio, data_horario_termino, status };
        bd_reservas.push(novaReserva);
        res.status(201).json({ mensagem: "Reserva feita com sucesso!" });
    } catch (error) {
        res.status(500).json(
            {
              msg: "Erro ao fazer reserva",
              erro: error.mensagem
            }
        );
    }
})

// atualizar horário ou mudar status

app.put('/reservas/:id', (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({mensagem: "Informe o id"})
        }
        
        const reserva = bd_reservas.find((reservas) => reservas.id === id);
        if(!reserva){
          return res.status(404).json({mensagem: "Reserva não encontrada"});
        }
      
        const {novoHorario, novoStatus} = req.body;
      
        if (reserva) {
            reserva.data_horario_inicio = novoHorario;
            reserva.status = novoStatus
        }
      
        res.status(200).json({msg: "Reserva atualizada com sucesso"});

    } catch (error) {
        res.status(500).json(
            {
              msg: "Erro ao atualizar reserva",
              erro: error.mensagem
            }
          );
    }
});

// Deletar reserva

app.delete('/reservas/:id', (req, res) => {
    try {
        
        const id = req.params.id;
        const index = bd_reservas.findIndex(reserva => reserva.id === id);
        if (index === -1) {
          return res.status(404).json({mensagem: "Reserva não encontrada"});
        }
    
        bd_reservas.splice(index, 1);
        res.status(200).json({mensagem: "reserva deletada com sucesso"})

    } catch (error) {
        res.status(500).json(
            {
              msg: "Erro ao deletar reserva",
              erro: error.mensagem
            }
          );
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });