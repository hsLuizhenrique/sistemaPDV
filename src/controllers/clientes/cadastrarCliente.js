const { knex } = require('../../connection/conexao')
const { validaIdToken } = require('../../services/auxiliarValidacoes/validaIdToken')
const { validaInputCadastroClientes } = require('../../validations/validaCamposCliente')


const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf,
        cep, rua, numero, bairro
        , cidade, estado } = req.body

    try {

        const authorization = req.headers
        const idUsuarioToken = validaIdToken(authorization.authorization);
        await validaInputCadastroClientes.validateAsync(req.body);

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })

    }

    try {
        const emailEncontrado = await knex('clientes').where({ email }).first();
        const cpfEncontrado = await knex('clientes').where({ cpf }).first();

        if (emailEncontrado) {
            return res.status(400).json({
                mensagem: "O email já cadastrado"
            })
        }
        if (cpfEncontrado) {
            return res.status(400).json({
                mensagem: "O cpf já cadastrado"
            })
        }

        await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        });

        const resultado = await knex('clientes').where('email', email)

        return res.status(201).json(resultado[0])

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: error.message })
    }
}



module.exports = {
    cadastrarCliente
}