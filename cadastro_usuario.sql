CREATE DATABASE cadastro_usuario;
USE cadastro_usuario;
CREATE TABLE usuario (
  id INT auto_increment primary KEY,
  nome varchar(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);