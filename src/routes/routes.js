const express = require('express')
const rotas = express()
const { cadastrarUsuario } = require('../controllers/usuarios/cadastrarUsuario')
const { logarUsuario } = require('../controllers/usuarios/logarUsuario')
const { detalharUsuario } = require('../controllers/usuarios/detalharUsuario')
const { atualizarUsuario } = require('../controllers/usuarios/atualizarUsuario')
const { listarCategorias } = require('../controllers/produtos/listarCategorias')
const { verificarUsuarioLogado } = require('../middlewares/autenticacao')
const { redefinirSenhaUsuario } = require('../controllers/usuarios/redefinirSenhaUsuario')
const { cadastrarProduto } = require('../controllers/produtos/cadastrarProduto')
const { editarProduto } = require('../controllers/produtos/editarProduto')
const { listarProduto } = require('../controllers/produtos/listarProduto')
const { excluirProduto } = require('../controllers/produtos/excluirProduto')
const { cadastrarCliente } = require('../controllers/clientes/cadastrarCliente')
const { editarCliente } = require('../controllers/clientes/editarCliente')
const { listarClientes } = require('../controllers/clientes/listarClientes')
const { detalharCliente } = require('../controllers/clientes/detalharClientes')
const { detalharProduto } = require('../controllers/produtos/detalharProduto')
const { cadastrarPedido } = require('../controllers/pedidos/cadastrarPedido')
const { listarPedidos } = require('../controllers/pedidos/listarPedidos')
const { adicionarImagem } = require('../controllers/produtos/adicionarImagemProduto')
const multer = require('../middlewares/multer')

rotas.post('/usuario', cadastrarUsuario)

rotas.post('/login', logarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.patch('/usuario/redefinir', redefinirSenhaUsuario)

rotas.get('/usuario', verificarUsuarioLogado, detalharUsuario)

rotas.put('/usuario', verificarUsuarioLogado, atualizarUsuario)

rotas.post('/produto', verificarUsuarioLogado, cadastrarProduto)

rotas.put('/produto/:id', verificarUsuarioLogado, editarProduto)

rotas.get('/produto/:id', verificarUsuarioLogado, detalharProduto)

rotas.get('/produto', verificarUsuarioLogado, listarProduto)

rotas.delete('/produto/:id', verificarUsuarioLogado, excluirProduto)

rotas.post('/cliente', verificarUsuarioLogado, cadastrarCliente)

rotas.put('/cliente/:id', verificarUsuarioLogado, editarCliente)

rotas.get('/cliente', verificarUsuarioLogado, listarClientes)

rotas.get('/cliente/:id', verificarUsuarioLogado, detalharCliente)

rotas.post('/pedido', verificarUsuarioLogado, cadastrarPedido)

rotas.get('/pedido', verificarUsuarioLogado, listarPedidos)

rotas.patch('/produto/:id/imagem', verificarUsuarioLogado, multer.single('imagem'), adicionarImagem)


module.exports = rotas;

