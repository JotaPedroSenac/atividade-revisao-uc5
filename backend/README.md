
# API de Gerenciamento de Coworking

## 📖 Descrição
API RESTful para gerenciar **clientes**, **endereços** e **reservas** em um espaço de coworking. Utiliza **PostgreSQL** como banco de dados e integração com a **API ViaCEP** para preenchimento automático de endereços com base no CEP informado.

## 🚀 Tecnologias Utilizadas
- Node.js
- Express
- PostgreSQL
- Axios
- dotenv
- insomnia

## ⚙️ Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/JotaPedroSenac/atividade-revisao-uc5.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd atividade-revisao-uc5
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Crie um arquivo `.env` na raiz do projeto e defina as variáveis de conexão com o banco de dados:
   ```env
   DB_HOST=localhost
   DB_PORT=porta
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   PORT=sua_porta
   ```

## ▶️ Como Rodar

Execute o seguinte comando para iniciar o servidor:
```bash
node index.js
```

O servidor será iniciado em:  
📍 `http://localhost:PORT` (a porta é definida no seu arquivo `.env`)

---

## 📚 Rotas da API

### 👤 Clientes

#### 🔹 Listar todos os clientes
- **GET** `/usuarios`
- **Resposta:**
  ```json
  [
    {
      "id": 1,
      "nome": "João da Silva"
    }
  ]
  ```

#### 🔹 Obter cliente por ID
- **GET** `/usuario/:id`

#### 🔹 Criar cliente
- **POST** `/usuarios`
- **Corpo:**
  ```json
  {
    "nome": "Maria Souza"
  }
  ```

#### 🔹 Atualizar cliente
- **PUT** `/usuario/:id`

#### 🔹 Deletar cliente
- **DELETE** `/usuario/:id`

#### 🔹 Deletar todos os clientes
- **DELETE** `/usuarios`

---

### 🏠 Endereços

#### 🔹 Listar todos os endereços
- **GET** `/enderecos`

#### 🔹 Obter endereço por Cliente
- **GET** `/endereco/:cliente_id`

#### 🔹 Criar endereço (com CEP)
- **POST** `/enderecos`
- **Corpo:**
  ```json
  {
    "cep": "01001-000",
    "numero": "123",
    "complemento": "Prox. ao mercadinho"
  }
  ```

#### 🔹 Atualizar endereço
- **PUT** `/endereco/:cliente_id`

---

### 📅 Reservas

#### 🔹 Listar todas as reservas
- **GET** `/reservas`

#### 🔹 Obter reservas por cliente
- **GET** `/reserva/cliente/:cliente_id`

#### 🔹 Obter reservas por CEP
- **GET** `/reserva/cep/:cep`

#### 🔹 Obter reservas por sala
- **GET** `/reserva/sala/:sala`

#### 🔹 Criar nova reserva
- **POST** `/reservas`
- **Corpo:**
  ```json
  {
    "cliente_id": 1,
    "endereco_id": 1,
    "sala": "102",
    "data_horario_inicio": "2025-04-10T14:00:00",
    "data_horario_termino": "2025-04-10T16:00:00",
    "status": "reservado"
  }
  ```

#### 🔹 Atualizar reserva
- **PUT** `/reserva/:cliente_id`

#### 🔹 Cancelar reserva
- **DELETE** `/reserva/:cliente_id`

#### 🔹 Cancelar todas as reservas
- **DELETE** `/reserva/`

---

## 📝 Observações
- O endereço é preenchido automaticamente via integração com a [API ViaCEP](https://viacep.com.br/).
- Certifique-se de que o banco de dados PostgreSQL está rodando corretamente.
- As rotas retornam mensagens apropriadas de sucesso ou erro para cada operação.
- recomendo uso do insomnia para teste da api.
- Sinta-se à vontade para sugerir melhorias.
