const joi = require('joi')

const senhaSchema = joi.object({
    senha_antiga: joi.string().max(500).required().messages({
        'any.required': 'O campo senha antiga é obrigatório ',
        'string.empty': 'O campo senha antiga é obrigatório',
        'string.max': 'O Campo excedeu o limite de 500 Caractéres',

    }),
    email: joi.string().max(255).email().required().messages({
        'any.required': 'O campo email é obrigatório ',
        'string.empty': 'O campo email é obrigatório',
        'string.email': 'O campo email precisa ter um formato válido',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',


    }),
    senha: joi.string().max(500).required().messages({
        'any.required': 'O campo nova senha é obrigatório ',
        'string.empty': 'O campo nova senha é obrigatório',
        'string.max': 'O Campo excedeu o limite de 500 Caractéres',

    })
});


module.exports = { senhaSchema }