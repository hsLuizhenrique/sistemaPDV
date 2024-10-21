const { knex } = require('../../connection/conexao');
const { excluirArquivo } = require('../../services/auxiliarArquivos/excluirArquivo');
const { obterKeyUrl } = require('../../services/auxiliarArquivos/obterKeyUrl');
const { validaInputIdProduto } = require('../../validations/validaIdProduto');


const excluirProduto = async (req, res) => {
    const { id } = req.params

    try {
        await validaInputIdProduto.validateAsync(req.params);

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }


    try {


        const localizaProduto = await knex('produtos').select('*').where('id', id)
        const localizaPedidosVinculados = await knex('pedido_produtos').select('*').where('produto_id', id)

        if (localizaProduto.length < 1) {
            return res.status(400).json({ mensagem: "O Produto não está cadastrado" })
        }

        if (localizaPedidosVinculados.length > 0) {
            return res.status(400).json({ mensagem: "O Produto já possui Pedidos vinculados a ele, por isso não pode ser excluído" })
        }

        if (localizaProduto[0].imagem_url !== undefined && localizaProduto[0].imagem_url !== null) {

            const path = obterKeyUrl(localizaProduto[0].imagem_url)

            await excluirArquivo(path)

            const deletar = await knex('produtos').where('id', id).delete()
            return res.status(201).json({ mensagem: 'Produto Excluído com sucesso' })

        } else {
            const deletar = await knex('produtos').where('id', id).delete()
            return res.status(201).json({ mensagem: 'Produto Excluído com sucesso' })
        }





    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    excluirProduto
}