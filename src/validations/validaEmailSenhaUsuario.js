const Joi = require('joi');

const validaInputEmailSenha = Joi.object({
    email: Joi.string().max(255).email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email precisa ter um formato válido',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    }),
    senha: Joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório'
    })
}).unknown(true);


const validaInputEmail = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email precisa ter um formato válido'
    })
}).unknown(true);


const validaInputSenha = Joi.object({
    senha: Joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório'
    })
}).unknown(true);


const validaInputNome = Joi.object({
    nome: Joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório'
    })
}).unknown(true);

module.exports = {
    validaInputEmailSenha,
    validaInputEmail,
    validaInputSenha,
    validaInputNome
};
