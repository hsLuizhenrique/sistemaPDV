const { knex } = require('../../connection/conexao')
const { validaInputIdCliente } = require('../../validations/validaIdCliente');



const detalharCliente = async (req, res) => {

    const { id } = req.params

    try {
        await validaInputIdCliente.validateAsync(req.params);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }

    try {

        const detalheCliente = await knex('usuarios').select('id', 'nome', 'email').where('id', id)


        if (Object.keys(detalheCliente).length === 0) {
            return res.status(400).json({ mensagem: 'ID de Cliente não identificado, favor informar um ID válido' })
        }
        return res.status(200).json(detalheCliente[0])


    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}


module.exports = {
    detalharCliente
}