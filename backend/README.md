# API de Gerenciamento de Reservas

## Descrição
Esta é uma API simples para gerenciar reservas de salas. Permite listar, criar, atualizar e excluir reservas.

## Tecnologias Utilizadas
- Node.js
- Express
- dotenv

## Instalação
1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd nome-do-projeto
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Crie um arquivo `.env` e defina a porta da aplicação:
   ```env
   PORTA=SUA PORTA
   ```

## Como Rodar
Execute o seguinte comando para iniciar o servidor:
```sh
node index.js
```

O servidor será iniciado em `http://localhost:PORTA` (na porta definida no arquivo `.env`).

## Rotas da API

### Listar todas as reservas
- **GET** `/reservas`
- **Resposta de sucesso (200)**
  ```json
  [
    {
      "id": "1",
      "usuario": "João Silva",
      "sala": "101",
      "data_horario_inicio": "2025-02-18T10:00:00",
      "data_horario_termino": "2025-02-18T12:00:00",
      "status": "finalizado"
    }
  ]
  ```

### Obter reserva por ID
- **GET** `/reservas/:id`
- **Resposta de sucesso (200)**
  ```json
  {
    "id": "1",
    "usuario": "João Silva",
    "sala": "101",
    "data_horario_inicio": "2025-02-18T10:00:00",
    "data_horario_termino": "2025-02-18T12:00:00",
    "status": "reservado"
  }
  ```

### Criar uma nova reserva
- **POST** `/reservas`
- **Corpo da requisição:**
  ```json
  {
    "id": "2",
    "usuario": "Maria Souza",
    "sala": "102",
    "data_horario_inicio": "2025-02-19T14:00:00",
    "data_horario_termino": "2025-02-19T16:00:00",
    "status": "reservado"
  }
  ```
- **Resposta de sucesso (201):**
  ```json
  { "mensagem": "Reserva feita com sucesso!" }
  ```

### Atualizar uma reserva (horário ou status)
- **PUT** `/reservas/:id`
- **Corpo da requisição:**
  ```json
  {
    "novoHorario": "2025-02-19T15:00:00",
    "novoStatus": "finalizado"
  }
  ```
- **Resposta de sucesso (200):**
  ```json
  { "msg": "Reserva atualizada com sucesso" }
  ```

### Deletar uma reserva
- **DELETE** `/reservas/:id`
- **Resposta de sucesso (200):**
  ```json
  { "mensagem": "reserva deletada com sucesso" }
  ```

## Observações
- A API utiliza um array em memória como banco de dados, logo os dados são perdidos ao reiniciar o servidor.
- É recomendado adicionar um banco de dados real para armazenamento persistente.


