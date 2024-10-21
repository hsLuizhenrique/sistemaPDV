const joi = require('joi')


const validaToken = joi.object({
    authorization: joi.string().required().messages({
        'any.required': 'O campo Token é obrigatório',
        'string.empty': 'O campo Token é obrigatório',
    })
}).unknown(true);

module.exports = { validaToken }