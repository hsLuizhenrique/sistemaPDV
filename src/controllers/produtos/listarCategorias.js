const { knex } = require('../../connection/conexao')

const listarCategorias = async (req, res) => {
    try {

        const categoria = await knex('categorias').select('categoria');

        return res.status(200).json(categoria);

    } catch (error) {
        console.log(error)

        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}


module.exports = { listarCategorias }
