const { knex } = require('../../connection/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validaInputEmailSenha } = require('../../validations/validaEmailSenhaUsuario')


const logarUsuario = async (req, res) => {
    const { email, senha } = req.body

    try {
        await validaInputEmailSenha.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }

    try {
        const usuarioValidado = await knex('usuarios').where({ email }).first();

        if (!usuarioValidado) {
            return res.status(404).json({ mensagem: 'O usuário não foi encontrado' })
        }

        const senhaDescriptografada = await bcrypt.compare(senha, usuarioValidado.senha)

        if (!senhaDescriptografada) {
            return res.status(400).json({ mensagem: 'É obrigatório informar E-mail/Senha corretos' })
        }

        const token = jwt.sign({ id: usuarioValidado.id }, process.env.JWTSECRET, { expiresIn: '8h' })

        const { senha: _, ...usuarioLogado } = usuarioValidado

        return res.json({ usuario: usuarioLogado, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: error.message })
    }
}


module.exports = {
    logarUsuario
}