const { knex } = require('../../connection/conexao')
const bcrypt = require('bcrypt')
const { validaIdToken } = require('../../services/auxiliarValidacoes/validaIdToken')
const { validaInputAtualizaClientes } = require('../../validations/validaCamposCliente')
const { validaInputIdCliente } = require('../../validations/validaIdCliente')


const editarCliente = async (req, res) => {
    const { nome, email, cpf,
        cep, rua, numero, bairro
        , cidade, estado } = req.body

    const { id } = req.params


    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ mensagem: 'É preciso enviar pelo menos um dado para que possamos atualizar' })
    }

    if (!nome || !email || !cpf) {
        return res.status(400).json({ mensagem: "É preciso informar os campos obrigatórios: Nome, Email, CPF" })
    }

    try {
        await validaInputAtualizaClientes.validateAsync(req.body);
        await validaInputIdCliente.validateAsync(req.params)


    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }



    try {
        const encontraCliente = await knex('clientes').where({ id }).first();
        if (encontraCliente === undefined) {
            return res.status(400).json({
                mensagem: "O campo id do Cliente precisa ser válido"
            })
        }


        if (email !== undefined) {
            const encontraEmail = await knex('clientes').select('email').where('email', email).first();


            if (encontraEmail !== undefined && encontraEmail.email === email && encontraCliente.email !== email) {
                return res.status(400).json({
                    mensagem: "O email já cadastrado"
                })
            }
        }

        if (cpf !== undefined) {
            const encontraCpf = await knex('clientes').select('cpf').where('cpf', cpf).first();
            if (encontraCpf !== undefined && encontraCpf.cpf === cpf && encontraCliente.cpf !== cpf) {
                return res.status(400).json({
                    mensagem: "O cpf já cadastrado"
                })
            }
        }



        if (nome) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    nome
                });

        }

        if (email) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    email
                });

        }

        if (cpf) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    cpf
                });

        }

        if (cep) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    cep
                });

        }

        if (rua) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    rua
                });

        }

        if (numero) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    numero
                });

        }

        if (bairro) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    bairro
                });

        }

        if (cidade) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    cidade
                });

        }

        if (estado) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    estado
                });

        }


        const resultado = await knex('clientes')
            .select('*')
            .where('id', id);


        return res.status(200).json({ mensagem: "Dados atualizados" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: error.message })
    }
}


module.exports = {
    editarCliente
}