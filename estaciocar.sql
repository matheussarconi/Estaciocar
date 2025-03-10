create database estaciocar;
use estaciocar;
 
create table carros(
    placa varchar(500) not null primary key unique,
    dono varchar(500) not null,
    cpf varchar(500) not null unique,
    vaga enum("Gestante", "Idoso","Deficiente", "Vaga1", "Vaga2", "Vaga3","Vaga4","Vaga5", "Vaga6", "Vaga7") not null default("comum")
);
 
create table usuario(
    cpf varchar(11) primary key
    nome varchar(200), 
    senha varchar(100), 
    tipo enum('admin','usuario')
); 

INSERT INTO colaboradores (cpf, email, senha) VALUES ('07698742031', 'Matheus', 'gs');

select * from carros;
select * from usuario;
