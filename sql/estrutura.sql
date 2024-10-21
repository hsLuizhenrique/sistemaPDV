CREATE DATABASE pdv

CREATE TABLE usuarios(
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(500) NOT NULL
  )
  
CREATE TABLE categorias(
  id SERIAL PRIMARY KEY,
  categoria VARCHAR(50) NOT NULL
 )

 CREATE TABLE produtos(
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  quantidade_estoque INT NOT NULL,
  valor INT NOT NULL,
  categoria_id SERIAL REFERENCES categorias(id)
  )

   CREATE TABLE clientes(
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  cpf VARCHAR(50) UNIQUE NOT NULL,
  cep VARCHAR(50) NOT NULL,
  rua VARCHAR(255) NOT NULL,
  numero VARCHAR(255) NOT NULL,
  bairro VARCHAR(255) NOT NULL,
  cidade VARCHAR(255) NOT NULL,
  estado VARCHAR(255) NOT NULL
  )
  
ALTER TABLE produtos
ADD COLUMN imagem_url VARCHAR(255);


CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,                
  cliente_id SERIAL REFERENCES clientes(id),             
  observacao TEXT,                    
  valor_total INT NOT NULL
  )

  
CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id SERIAL REFERENCES pedidos(id),
    produto_id SERIAL REFERENCES produtos(id),
    quantidade_produto INT NOT NULL,
    valor_produto INT NOT NULL
  )


