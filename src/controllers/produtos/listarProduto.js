const { knex } = require('../../connection/conexao');
const { validaInputCategoriaId } = require('../../validations/validaCamposProdutos');

const listarProduto = async (req, res) => {

    const { categoria_id } = req.query

    if (categoria_id !== undefined) {

        try {
            await validaInputCategoriaId.validateAsync({ categoria_id })

        } catch (error) {
            return res.status(400).json({ mensagem: error.message })
        }
    }

    try {

        if (categoria_id === undefined) {
            const produto = await knex('produtos').select('*');
            return res.status(200).json(produto);
        }

        if (categoria_id) {
            const produto = await knex('produtos').select('*').where('categoria_id', categoria_id);
            if (produto.length > 0) {
                return res.status(200).json(produto);

            }
            if (produto.length < 1) {
                return res.status(400).json({ mensagem: 'Não existem produtos cadastrados para essa categoria' });
            }

        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}


module.exports = { listarProduto }
