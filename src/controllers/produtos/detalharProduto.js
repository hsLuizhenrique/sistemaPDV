const { knex } = require('../../connection/conexao')
const { validaInputIdProduto } = require('../../validations/validaIdProduto');

const detalharProduto = async (req, res) => {
    const { id } = req.params

    try {

        await validaInputIdProduto.validateAsync(req.params);

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }

    try {

        const encontraProduto = await knex('produtos').where({ id }).first();

        if (encontraProduto === undefined) {
            return res.status(400).json({
                mensagem: "O campo id do produto precisa ser válido"
            })
        }

        const detalhesProduto = await knex('produtos').select('*').where('id', id)
        return res.json(detalhesProduto[0])


    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}


module.exports = {
    detalharProduto
}