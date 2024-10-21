const bcrypt = require('bcrypt')
const { knex } = require('../../connection/conexao')
const { transportador } = require('../../services/auxiliarEmail/conexaoEmail')
const { compiladorHtml } = require('../../services/auxiliarEmail/compiladorHtml')
const { senhaSchema } = require('../../validations/validaNovaSenhaUsuario')



const redefinirSenhaUsuario = async (req, res) => {
    const senha_antiga = req.body.senha_antiga
    const email = req.body.email
    const senha = req.body.senha

    try {
        await senhaSchema.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }

    try {

        const nova_senhaCriptografada = await bcrypt.hash(senha, 10)


        const validaSenha = await knex('usuarios')
            .select('senha')
            .where('email', email).first()


        const ValidarEmail = await knex('usuarios')
            .select('email')
            .where('email', email).first()


        if (!ValidarEmail) {
            return res.status(400).json({ mensagem: " usuario nao encontrado" })
        }


        const senhaCriptografada = String(validaSenha.senha);

        const emailFormatado = String(ValidarEmail.email)

        const verificarSenha = await bcrypt.compare(senha_antiga, senhaCriptografada)


        if (!verificarSenha || emailFormatado !== email) {
            return res.status(400).json({ mensagem: "Senha ou email inválidos" });
        }
        if (senha === senha_antiga) {
            return res.status(400).json({ mensagem: " a nova senha não pode ser igual à antiga" })
        }

        const atualizaSenha = await knex('usuarios')
            .update({ senha: nova_senhaCriptografada })
            .where('email', '=', email)
            .returning(['id', 'nome', 'email']);

        const nomeUsuario = await knex('usuarios').select('nome').where('email', email).first()

        const html = await compiladorHtml('src/templates/templateEmailNovaSenha.html', {
            nomeusuario: nomeUsuario
        })

        await transportador.sendMail({
            from: `${process.env.EMAIL_FROM} <${process.env.EMAIL_FROM}>`,
            to: ` ${atualizaSenha[0].nome} <${atualizaSenha[0].email}>`,
            subject: 'Senha Redefinida ',
            html
        })

        return res.status(200).json(atualizaSenha[0])



    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: error.message })
    }
}


module.exports = {
    redefinirSenhaUsuario
}
