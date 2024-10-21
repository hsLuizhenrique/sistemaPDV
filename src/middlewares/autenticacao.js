const jwt = require('jsonwebtoken')
const { knex } = require('../connection/conexao')
const { validaToken } = require('../validations/validaToken')

const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers

    try {
        await validaToken.validateAsync(req.headers);

    } catch (error) {
        return res.status(401).json({ mensagem: error.message })
    }


    try {

        if (!authorization) {
            return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
        }

        const token = authorization.split(' ')[1]


        const { id } = jwt.verify(token, process.env.JWTSECRET)

        const teste = await knex('usuarios').where('id', id)


        if (teste.length === 0) {
            return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
        }

        req.usuario = teste

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ mensagem: 'Erro na validação do Token' })
    }
}

module.exports = { verificarUsuarioLogado }