const { knex } = require('../../connection/conexao')
const { validaInputDescricao, validaInputQuantidadeEstoque, validaInputValor, validaInputCategoriaId } = require('../../validations/validaCamposProdutos')


const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {
        await validaInputDescricao.validateAsync(req.body);
        await validaInputQuantidadeEstoque.validateAsync(req.body);
        await validaInputValor.validateAsync(req.body);
        await validaInputCategoriaId.validateAsync(req.body);


    } catch (error) {
        console.log(error)
        return res.status(400).json({ mensagem: error.message })
    }

    try {

        const categoriaEncontrada = await knex('categorias').select('*').where('id', categoria_id).first();

        if (!categoriaEncontrada) {
            return res.status(400).json({
                mensagem: "O campo categoria_id precisa ser válido"
            })
        }

        const cadastro = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).returning('id');

        const resultado = await knex('produtos').where('id', cadastro[0].id)


        return res.status(201).json(resultado[0])

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}



module.exports = {
    cadastrarProduto
}

