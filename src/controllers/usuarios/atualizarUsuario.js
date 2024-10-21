const { knex } = require('../../connection/conexao')
const bcrypt = require('bcrypt')
const { validaIdToken } = require('../../services/auxiliarValidacoes/validaIdToken')
const { validaInputEmail, validaInputNome, validaInputSenha } = require('../../validations/validaEmailSenhaUsuario')
const { transportador } = require('../../services/auxiliarEmail/conexaoEmail')
const { compiladorHtml } = require('../../services/auxiliarEmail/compiladorHtml')



const atualizarUsuario = async (req, res) => {
    const novoNome = req.body.nome
    const novoEmail = req.body.email
    const novaSenha = req.body.senha


    try {
        await validaInputEmail.validateAsync(req.body);
        await validaInputNome.validateAsync(req.body);
        await validaInputSenha.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }


    try {

        const { authorization } = req.headers
        const idUsuarioToken = validaIdToken(authorization);

        const novaSenhaCriptografada = await bcrypt.hash(novaSenha, 10)
        const validaEmail = await knex('usuarios').select('email').where('email', novoEmail).andWhere('id', '!=', idUsuarioToken)

        if (validaEmail.length > 0) {
            return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." })
        }

        const atualizacaoUsuario = await knex('usuarios')
            .where('id', idUsuarioToken)
            .update({
                nome: novoNome,
                email: novoEmail,
                senha: novaSenhaCriptografada
            })
            .returning('*')

        const resultado = await knex('usuarios')
            .select('id', 'nome', 'email')
            .where('id', idUsuarioToken);


        const nomeUsuario = await knex('usuarios').select('nome').where('id', idUsuarioToken).first()

        const html = await compiladorHtml('src/templates/templateEmailNovosDados.html', {
            nomeusuario: nomeUsuario
        })

        await transportador.sendMail({
            from: `${process.env.EMAIL_FROM} <${process.env.EMAIL_FROM}>`,
            to: ` ${resultado[0].nome} <${resultado[0].email}>`,
            subject: 'Dados Atualizados ',
            html
        })


        return res.status(200).json({ mensagem: "Dados atualizados" })


    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}


module.exports = {
    atualizarUsuario
}