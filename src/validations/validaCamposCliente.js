const joi = require('joi')
const validaInputCadastroClientes = joi.object({
    nome: joi.string().max(50).required().messages({
        'any.required': 'O campo nome  é obrigatório ',
        'string.empty': 'O campo nome  é obrigatório',
        'string.max': 'O Campo excedeu o limite de 50 Caractéres',
    }),
    email: joi.string().max(255).email().required().messages({
        'any.required': 'O campo email é obrigatório ',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email precisa ter um formato válido',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
    cpf: joi.string().max(50).required().messages({
        'any.required': 'O campo cpf é obrigatório ',
        'string.empty': 'O campo cpf é obrigatório',
        'string.max': 'O Campo excedeu o limite de 50 Caractéres',

    }),
    cep: joi.string().max(50).required().messages({
        'any.required': 'O campo cep é obrigatório ',
        'string.empty': 'O campo cep é obrigatório',
        'string.max': 'O Campo excedeu o limite de 50 Caractéres',

    }),
    rua: joi.string().max(255).required().messages({
        'any.required': 'O campo rua é obrigatório ',
        'string.empty': 'O campo rua é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
    numero: joi.string().max(255).required().messages({
        'any.required': 'O campo numero é obrigatório ',
        'string.empty': 'O campo numero é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
    bairro: joi.string().max(255).required().messages({
        'any.required': 'O campo bairro é obrigatório ',
        'string.empty': 'O campo bairro é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
    cidade: joi.string().max(255).required().messages({
        'any.required': 'O campo cidade é obrigatório ',
        'string.empty': 'O campo cidade é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
    estado: joi.string().max(255).required().messages({
        'any.required': 'O campo estado é obrigatório ',
        'string.empty': 'O campo estado é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
});

const validaInputAtualizaClientes = joi.object({
    nome: joi.string().max(50).messages({
        'any.required': 'O campo nome antiga é obrigatório ',
        'string.empty': 'O campo nome antiga é obrigatório',
        'string.max': 'O Campo excedeu o limite de 50 Caractéres',

    }),
    email: joi.string().max(255).email().messages({
        'any.required': 'O campo email é obrigatório ',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email precisa ter um formato válido',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',


    }),
    cpf: joi.string().max(50).messages({
        'any.required': 'O campo cpf é obrigatório ',
        'string.empty': 'O campo cpf é obrigatório',
        'string.max': 'O Campo excedeu o limite de 50 Caractéres',

    }),
    cep: joi.string().max(50).messages({
        'any.required': 'O campo cep é obrigatório ',
        'string.empty': 'O campo cep é obrigatório',
        'string.max': 'O Campo excedeu o limite de 50 Caractéres',

    }),
    rua: joi.string().max(255).messages({
        'any.required': 'O campo rua é obrigatório ',
        'string.empty': 'O campo rua é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
    numero: joi.string().max(255).messages({
        'any.required': 'O campo numero é obrigatório ',
        'string.empty': 'O campo numero é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
    bairro: joi.string().max(255).messages({
        'any.required': 'O campo bairro é obrigatório ',
        'string.empty': 'O campo bairro é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
    cidade: joi.string().max(255).messages({
        'any.required': 'O campo cidade é obrigatório ',
        'string.empty': 'O campo cidade é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
    estado: joi.string().max(255).messages({
        'any.required': 'O campo estado é obrigatório ',
        'string.empty': 'O campo estado é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
});



module.exports = {
    validaInputCadastroClientes,
    validaInputAtualizaClientes

}