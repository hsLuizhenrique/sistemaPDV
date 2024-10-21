const joi = require('joi')

const validaInputIdCliente = joi.object({
    id: joi.number().positive().required().messages({
        'any.required': 'É preciso informar um numero de ID de Cliente válido',
        'string.empty': 'É preciso informar um numero de ID de Cliente válido',
        'number.base': 'É preciso informar um numero de ID de Cliente válido',
        'number.positive': 'É preciso informar um numero de ID de Cliente válido, com um numero positivo',

    })
}).unknown(true);

module.exports = {
    validaInputIdCliente
}


