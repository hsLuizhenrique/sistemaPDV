const { knex } = require('../../connection/conexao')

const listarClientes = async (req, res) => {
    try {

        const cliente = await knex('clientes').select('*');

        return res.status(200).json(cliente);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}


module.exports = { listarClientes }
