const joi = require('joi')
const validaInputCadastroPedidos = joi.object({
    cliente_id: joi.number().positive().required().messages({
        'any.required': 'O campo cliente_id  é obrigatório ',
        'string.empty': 'O campo cliente_id  é obrigatório',
        'number.base': 'É preciso informar um numero de ID de Cliente válido',
        'number.positive': 'O campo cliente_id deve ser um número positivo'

    }),

    observacao: joi.string().allow(null, "").messages({
        'any.required': 'O campo Observação é Obrigatório',
        'string.empty': 'O campo Observação é Obrigatório',

    }),

    pedido_produtos: joi.array().items(
        joi.object({
            produto_id: joi.number().positive().required().messages({
                'any.required': 'O campo produto_id  é obrigatório e precisa ser um numero ',
                'string.empty': 'O campo produto_id  é obrigatório e precisa ser um numero ',
                'number.base': 'O campo produto_id  é obrigatório e precisa ser um numero ',
                'number.positive': 'O campo produto_id deve ser um número positivo',
            }),
            quantidade_produto: joi.number().positive().required().messages({
                'any.required': 'O campo quantidade_produtos  é obrigatório e precisa ser um numero ',
                'string.empty': 'O campo quantidade_produtos  é obrigatório e precisa ser um numero',
                'number.base': 'O campo quantidade_produtos  é obrigatório e precisa ser um numero',
                'number.positive': 'O campo quantidade_produtos deve ser um número positivo'

            })
        })

    ).required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório ',
        'string.empty': 'O campo pedido_produtos é obrigatório',
    })

})



module.exports = {
    validaInputCadastroPedidos
}