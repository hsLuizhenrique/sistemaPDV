const multer = require('../../middlewares/multer')
const aws = require('aws-sdk')
const { uploadArquivos } = require('../../services/auxiliarArquivos/uploadArquivo')
const { validaInputIdProduto } = require('../../validations/validaIdProduto')
const { knex } = require('../../connection/conexao')
const { obterKeyUrl } = require('../../services/auxiliarArquivos/obterKeyUrl')
const { excluirArquivo } = require('../../services/auxiliarArquivos/excluirArquivo')



const adicionarImagem = async (req, res) => {

    const { file } = req
    const { id } = req.params

    try {

        await validaInputIdProduto.validateAsync(req.params);

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }


    try {

        const localizaProduto = await knex('produtos').select('*').where('id', id)

        if (localizaProduto.length < 1) {
            return res.status(400).json({ mensagem: 'É preciso informar um ID que esteja cadastrado' })
        }

        if (!file) {

            if (localizaProduto[0].imagem_url) {

                const path = obterKeyUrl(localizaProduto[0].imagem_url)

                await excluirArquivo(path)

            }

            const atualizacao = await knex('produtos').
                where('id', id)
                .update({
                    'imagem_url': null
                }
                )

            const resultado = await knex('produtos').where('id', id)


            return res.status(200).json(resultado[0])

        }


        if (file) {
            const data = new Date
            const geradorNomeArquivo = (`${id}-${data.getDay()}-${file.originalname.replaceAll(" ", "-")}`)

            if (localizaProduto[0].imagem_url) {

                const path = obterKeyUrl(localizaProduto[0].imagem_url)

                await excluirArquivo(path)

            }


            const upload = await uploadArquivos(file, geradorNomeArquivo)


            const atualizacao = await knex('produtos').
                where('id', id)
                .update({
                    'imagem_url': upload.Location.replace("/s3/", "/object/public/")
                }
                )


            const resultado = await knex('produtos').where('id', id)



            return res.status(200).json(resultado[0])
        }

    } catch (error) {
        return res.status(500).json({ messagem: 'Houve algum erro no servidor' })
    }
}

module.exports = {
    adicionarImagem
}