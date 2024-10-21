
# Esta API foi desenvolvida para gerenciar um PDV (Frente de Caixa), permitindo o cadastro, consulta, edição e exclusão de usuários, categorias, produtos e clientes. As funcionalidades são acessadas através de endpoints específicos, todos detalhados a seguir.

## URL Base
A URL base da API é: 

## Endpoints
### 1. Listar Categorias
Rota: GET /categoria

Descrição: Retorna uma lista de todas as categorias cadastradas no sistema.

 Exemplo de Resposta:
```
[
    {"id": 1, "descricao": "Informática"},
    {"id": 2, "descricao": "Celulares"},
    {"id": 3, "descricao": "Beleza e Perfumaria"},

    // ... outras categorias
]
````
### 2. Cadastrar Usuário
Rota: POST /usuario
#### Descrição: Cadastra um novo usuário no sistema.

Campos Obrigatórios:
* nome (string): Nome do usuário.
* email (string): E-mail do usuário (deve ser único).
* senha (string): Senha do usuário (será criptografada).
  
Exemplo de Requisição:
```
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "minhasenha"
}
```

#### Exemplo de Resposta (201 - Created):
```
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```


### 3. Efetuar Login
Rota: POST /login
#### Descrição: Permite o login de um usuário já cadastrado.

#### Campos Obrigatórios:
*  email (string): E-mail do usuário.
* senha (string): Senha do usuário.

#### Exemplo de Requisição:
````
{
    "email": "jose@email.com",
    "senha": "minhasenha"
}
````

### 4. Redefinir Senha
Rota: PATCH /usuario/redefinir
#### Descrição: Permite ao usuário redefinir sua senha.

#### Campos Obrigatórios:

* email (string): E-mail do usuário.
* senha_antiga (string): Senha atual do usuário.
* senha_nova (string): Nova senha do usuário.
* 
#### Exemplo de Requisição:
````
{
    "email": "jose@email.com",
    "senha_antiga": "minhasenha",
    "senha_nova": "novasenha"
}
````

#### Exemplo de Resposta (200 - OK):
````
{
    "mensagem": "Senha alterada com sucesso."
}
````
### 5. Detalhar Perfil do Usuário Logado
Rota: GET /usuario

#### Descrição: Retorna os dados do perfil do usuário logado.

#### Exemplo de Resposta (200 - OK):
````
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
````

### 6. Editar Perfil do Usuário Logado
Rota: PUT /usuario

#### Descrição: Atualiza as informações do perfil do usuário logado.

#### Campos Obrigatórios:
* nome (string): Nome do usuário.
* email (string): E-mail do usuário (deve ser único).
* senha (string): Senha do usuário (será criptografada).

#### Exemplo de Requisição:
````
{
    "nome": "José Silva",
    "email": "jose.silva@email.com",
    "senha": "novasenha"
}
```` 
#### Exemplo de Resposta (200 - OK):
````
{
    "id": 1,
    "nome": "José Silva",
    "email": "jose.silva@email.com"
}
````

### 7. Cadastrar Produto
Rota: POST /produto

#### Descrição: Permite ao usuário logado cadastrar um novo produto.

#### Campos Obrigatórios:
* descricao (string): Descrição do produto.
* quantidade_estoque (integer): Quantidade em estoque.
* valor (integer): Valor do produto em centavos.
* categoria_id (integer): ID da categoria do produto.
  
#### Exemplo de Requisição:
````
{
    "descricao": "Notebook Dell",
    "quantidade_estoque": 10,
    "valor": 350000,
    "categoria_id": 1
}
````

#### Exemplo de Resposta (201 - Created):
````
{
    "id": 1,
    "descricao": "Notebook Dell",
    "quantidade_estoque": 10,
    "valor": 350000,
    "categoria_id": 1
}
````

### 8. Editar Produto
Rota: PUT /produto/:id

#### Descrição: Permite ao usuário logado atualizar as informações de um produto cadastrado.

#### Campos Obrigatórios:
* descricao (string): Descrição do produto.
* quantidade_estoque (integer): Quantidade em estoque.
* valor (integer): Valor do produto em centavos.
* categoria_id (integer): ID da categoria do produto.

#### Exemplo de Requisição:
````
{
    "descricao": "Notebook Dell Inspiron",
    "quantidade_estoque": 15,
    "valor": 360000,
    "categoria_id": 1
}
````

#### Exemplo de Resposta (200 - OK):
````
{
    "id": 1,
    "descricao": "Notebook Dell Inspiron",
    "quantidade_estoque": 15,
    "valor": 360000,
    "categoria_id": 1
}
````

### 9. Listar Produtos
Rota: GET /produto

#### Descrição: Lista todos os produtos cadastrados.

####Exemplo de Resposta (200 - OK):
 
````
[
    {"id": 1, "descricao": "Notebook Dell", "quantidade_estoque": 10, "valor": 350000, "categoria_id": 1},
    {"id": 2, "descricao": "Smartphone Samsung", "quantidade_estoque": 20, "valor": 120000, "categoria_id": 2}
    // ... outros produtos
]
````

### 10. Detalhar Produto
Rota: GET /produto/:id

#### Descrição: Obtém os detalhes de um produto específico.

#### Exemplo de Resposta (200 - OK):
````
{
    "id": 1,
    "descricao": "Notebook Dell",
    "quantidade_estoque": 10,
    "valor": 350000,
    "categoria_id": 1
}
````

### 11. Excluir Produto
Rota: DELETE /produto/:id

#### Descrição: Permite ao usuário logado excluir um produto específico.

### 12. Cadastrar Cliente
Rota: POST /cliente

#### Descrição: Permite ao usuário logado cadastrar um novo cliente.

#### Campos Obrigatórios:
* nome (string): Nome do cliente.
* email (string): E-mail do cliente (deve ser único).
* cpf (string): CPF do cliente (deve ser único).

#### Exemplo de Requisição:
````
{
    "nome": "Maria",
    "email": "maria@email.com",
    "cpf": "123.456.789-00"
}
````

#### Exemplo de Resposta (201 - Created):

````
{
    "id": 1,
    "nome": "Maria",
    "email": "maria@email.com",
    "cpf": "123.456.789-00"
}
````

### 13. Editar Cliente
Rota: PUT /cliente/:id

#### Descrição: Permite ao usuário atualizar as informações de um cliente cadastrado.

#### Campos Obrigatórios:
* nome (string): Nome do cliente.
* email (string): E-mail do cliente (deve ser único).
* cpf (string): CPF do cliente (deve ser único).

#### Exemplo de Requisição:
````
{
    "nome": "Maria da Silva",
    "email": "maria.silva@email.com",
    "cpf": "123.456.789-00"
}
````

#### Exemplo de Resposta (200 - OK):
````
{
    "id": 1,
    "nome": "Maria da Silva",
    "email": "maria.silva@email.com",
    "cpf": "123.456.789-00"
}
````

### 14. Listar Clientes
Rota: GET /cliente

#### Descrição: Lista todos os clientes cadastrados.

#### Exemplo de Resposta (200 - OK):
````
[
    {"id": 1, "nome": "Maria", "email": "maria@email.com", "cpf": "123.456.789-00"},
    {"id": 2, "nome": "João", "email": "joao@email.com", "cpf": "987.654.321-00"}
    // ... outros clientes
]
````

### 15. Detalhar Cliente
Rota: GET /cliente/:id

#### Descrição: Obtém os detalhes de um cliente específico.

#### Exemplo de Resposta (200 - OK):
````
{
    "id": 1,
    "nome": "Maria",
    "email": "maria@email.com",
    "cpf": "123.456.789-00"
}
````
