const Joi = require('joi');

const validaInputDescricao = Joi.object({
    descricao: Joi.string().max(255).required().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição é obrigatório',
        'string.max': 'O Campo excedeu o limite de 255 Caractéres',

    })
}).unknown(true);


const validaInputQuantidadeEstoque = Joi.object({
    quantidade_estoque: Joi.number().positive().required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório',
        'number.empty': 'O campo quantidade_estoque é obrigatório',
        'number.positive': 'O quantidade_estoque deve ser um número positivo',
        'number.base': 'O campo quantidade_estoque deve ser um número positivo'


    })
}).unknown(true);


const validaInputValor = Joi.object({
    valor: Joi.number().positive().required().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.empty': 'O campo valor é obrigatório',
        'number.positive': 'O valor deve ser um número positivo',
        'number.base': 'O campo valor deve ser um número positivo'


    })
}).unknown(true);


const validaInputCategoriaId = Joi.object({
    categoria_id: Joi.number().positive().required().messages({
        'any.required': 'O campo categoria_id é obrigatório',
        'number.empty': 'O campo categoria_id é obrigatório',
        'number.positive': 'O campo categoria_id deve ser um número positivo',
        'number.base': 'O campo categoria_id deve ser um número positivo'

    })
}).unknown(true);

module.exports = {
    validaInputDescricao,
    validaInputQuantidadeEstoque,
    validaInputValor,
    validaInputCategoriaId
}