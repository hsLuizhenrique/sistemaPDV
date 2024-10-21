const { knex } = require('../../connection/conexao')
const { validaIdToken } = require('../../services/auxiliarValidacoes/validaIdToken')
const { validaInputCadastroPedidos } = require('../../validations/validaCamposPedido')
const { validaInputIdCliente } = require('../../validations/validaIdCliente')



const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body
    let valor_total = 0
    let soma = 0;

    try {

        const authorization = req.headers
        const idUsuarioToken = validaIdToken(authorization.authorization);
        await validaInputIdCliente.validateAsync({ 'id': cliente_id })
        await validaInputCadastroPedidos.validateAsync(req.body);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ mensagem: error.message })

    }

    try {
        const cliente_idEncontrado = await knex('clientes').select('id').where('id', cliente_id).first();


        if (!cliente_idEncontrado) {
            return res.status(400).json({
                mensagem: "O cliente informado não está cadastrado, cadastre-o para que possa realizar o pedido  "
            })
        }

        if (pedido_produtos.length < 1) {
            return res.status(400).json({ mensagem: " É preciso informar os produtos do Pedido" })
        }

        const pedidoFeito = await knex('pedidos').insert({
            cliente_id,
            observacao,
            valor_total
        }).returning('*');




        for (let i = 0; i < pedido_produtos.length; i++) {

            let { quantidade_produto, produto_id } = pedido_produtos[i]

            if (!quantidade_produto || !produto_id) {
                return res.status(400).json({
                    mensagem: "O produto e a quantidade precisam ser lançados"
                })
            }

            const localizaProduto = await knex('produtos').select('*').where('id', produto_id)
            if (!localizaProduto[0]) {
                return res.status(400).json({ mensagem: 'Produto não está cadastrado, é preciso informar um ID de produto que seja válido ' })
            }

            if (localizaProduto[0].quantidade_estoque < quantidade_produto) {
                return res.status(400).json({ mensagem: `O Pedido não pode ser realizado pois a quantidade solicitada do produto ${produto_id} foi de ${quantidade_produto}, o que está acima do disponível em estoque ` })
            }

            const valor_produto = localizaProduto[0].valor

            soma += (quantidade_produto * valor_produto);

            const novoEstoque = localizaProduto[0].quantidade_estoque - quantidade_produto


            await knex('pedido_produtos').insert({
                quantidade_produto,
                valor_produto,
                'pedido_id': pedidoFeito[0].id,
                produto_id,
            });

            await knex('produtos').where(
                'id', produto_id
            ).update({
                'quantidade_estoque': novoEstoque
            });

        }


        const atualizarValorTotal = await knex('pedidos').where('id', pedidoFeito[0].id).update({
            'valor_total': soma
        });


        const pedidoRealizado = { ...pedidoFeito[0], 'valor_total': soma }
        const produtosPedidos = await knex('pedido_produtos').where('pedido_id', pedidoFeito[0].id)


        return res.status(201).json({ pedidoRealizado, produtosPedidos })

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}



module.exports = {
    cadastrarPedido
}