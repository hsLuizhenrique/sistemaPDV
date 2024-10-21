const { knex } = require('../../connection/conexao');
const { validaIdToken } = require('../../services/auxiliarValidacoes/validaIdToken');
const { validaInputIdCliente } = require('../../validations/validaIdCliente');


const listarPedidos = async (req, res) => {
    const query = req.query.cliente_id
    const id = { 'id': Number(req.query.cliente_id) }
    const listaPedidos = []
    if (!query) {

        try {
            console.log('Entrei no Catch de query vazia')
            const pedidos_produtos = await knex('pedido_produtos').select('*');
            const pedidos = await knex('pedidos').select('*');
            return res.status(200).json([{ pedidos, pedidos_produtos }]);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }

    if (query) {

        try {

            await validaInputIdCliente.validateAsync(id)

        } catch (error) {
            console.log(error)
            return res.status(400).json(error.message)

        }

        try {


            if (id) {
                const pedidos = await knex('pedidos').select('*').where('cliente_id', id.id);

                for (let i = 0; i < pedidos.length; i++) {
                    const pedido_id = pedidos[i].id
                    const produtos = await knex('pedido_produtos').select('*').where('pedido_id', pedido_id)
                    const pedidos_produtos = produtos
                    listaPedidos.push(pedidos[i])
                    listaPedidos.push({ pedidos_produtos })

                }

                return res.status(200).json(listaPedidos)
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ mensagem: "Erro interno do servidor" });
        }
    }
}


module.exports = { listarPedidos }