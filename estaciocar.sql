create database estaciocar;
use estaciocar;
 
create table carros(
    placa int not null primary key unique,
    dono varchar(500) not null,
    cpf varchar(500) not null unique,
    vaga enum("Gestante", "Idoso","Deficiente", "Vaga1", "Vaga2", "Vaga3","Vaga4","Vaga5", "Vaga6", "Vaga7") not null default("comum")
);
 
create table usuario(
    cpf varchar(11) PK 
    nome varchar(200) 
    senha varchar(100) 
    tipo enum('admin','usuario')
); 

drop table projetos;
INSERT INTO colaboradores (nomeUsuario, email, senha) VALUES ('Giovani', 'g@g.com', 'gs');

select * from projetos;
select * from colaboradores;