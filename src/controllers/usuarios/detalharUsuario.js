const { knex } = require('../../connection/conexao')
const { validaIdToken } = require('../../services/auxiliarValidacoes/validaIdToken')




const detalharUsuario = async (req, res) => {

    try {

        const { authorization } = req.headers
        const idUsuarioToken = validaIdToken(authorization);


        const detalhesPerfil = await knex('usuarios').select('id', 'nome', 'email').where('id', idUsuarioToken)
        return res.json(detalhesPerfil[0])


    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: error.message })
    }
}


module.exports = {
    detalharUsuario
}