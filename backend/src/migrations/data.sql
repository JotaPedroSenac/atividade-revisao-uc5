-- atividade reserva de coworking

-- tabela 1 - Cliente
begin;
CREATE TABLE IF NOT EXISTS Coworking_Cliente (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(60) NOT NULL
);

-- tabela 2 - EnderecoCliente
CREATE TABLE IF NOT EXISTS Coworking_Endereco (
	id serial primary key,
	cliente_id int not null,
    cep char(8) not null,
    logradouro VARCHAR(50) NOT NULL,
    numero varchar(10) not null,
    complemento VARCHAR(60),
    bairro VARCHAR(30) not null,
    localidade VARCHAR(30) not null,
    uf CHAR(2) not null,
    ponto_referencia varchar(60),
    constraint fk_cliente foreign key (cliente_id) references Coworking_Cliente(id)
);


-- tabela 3 - Reserva

CREATE TABLE IF NOT EXISTS Coworking_Reserva (
    id SERIAL PRIMARY KEY,
    cliente_id int not null,
    endereco_id int not null,
    sala VARCHAR(10) NOT NULL,
    data_horario_inicio TIMESTAMP NOT NULL,
    data_horario_termino TIMESTAMP NOT NULL,
    status VARCHAR(10) NOT null,
    constraint fk_cliente foreign key (cliente_id) references Coworking_Cliente(id),
    constraint fk_endereco foreign key (endereco_id) references Coworking_Endereco(id)
    
);

INSERT INTO Coworking_Cliente (usuario)
VALUES ('Valtemir');

select * from Coworking_Cliente;

INSERT INTO Coworking_Endereco (cliente_id, cep, logradouro, numero, bairro, localidade, uf, ponto_referencia )
VALUES (1, '59025030', 'Rua São Tomé', '444', 'Cidade Alta', 'Natal', 'RN', 'prox ao sesc');

select * from Coworking_Endereco;

INSERT INTO Coworking_Reserva (cliente_id, endereco_id, sala, data_horario_inicio, data_horario_termino, status)
VALUES (1, 1, 'A01', '2025-03-10 10:00:00', '2025-03-10 12:00:00', 'reservado');

select * from Coworking_Reserva;
commit;
rollback;