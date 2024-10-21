const jwt = require('jsonwebtoken')


const validaIdToken = (authorization) => {

    try {

        const token = authorization.split(' ')[1]
        const validaToken = jwt.verify(token, process.env.JWTSECRET)
        const idUsuarioToken = validaToken.id
        return idUsuarioToken
    }
    catch {
        throw new Error('Token de acesso inválido');
    }

}

module.exports = {
    validaIdToken
}