
const { knex } = require('../../connection/conexao')
const { validaIdToken } = require('../../services/auxiliarValidacoes/validaIdToken')
const { validaInputDescricao, validaInputQuantidadeEstoque, validaInputValor, validaInputCategoriaId } = require('../../validations/validaCamposProdutos')


const editarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { id } = req.params

    try {

        await validaInputDescricao.validateAsync(req.body);
        await validaInputQuantidadeEstoque.validateAsync(req.body);
        await validaInputValor.validateAsync(req.body);
        await validaInputCategoriaId.validateAsync(req.body);

        const { authorization } = req.headers
        const idUsuarioToken = validaIdToken(authorization);

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }

    try {

        const encontraCategoria = await knex('categorias').where('id', categoria_id).first();

        if (encontraCategoria === undefined) {
            return res.status(400).json({
                mensagem: "O campo categoria_id precisa ser válido"
            })
        }

        const encontraProduto = await knex('produtos').select('*').where('id', id).first();

        if (encontraProduto === undefined) {
            return res.status(400).json({
                mensagem: "O campo id do produto precisa ser válido"
            })
        }

        const atualizacaoUsuario = await knex('produtos')
            .where('id', id)
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            })


        return res.status(200).json({ mensagem: "Dados atualizados" })


    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}



module.exports = {
    editarProduto
}