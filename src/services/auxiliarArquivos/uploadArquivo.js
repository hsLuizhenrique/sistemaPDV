const { multer } = require('../../middlewares/multer')
const { s3 } = require('./conexaoS3')



const uploadArquivos = async (file, nomeArquivo) => {

    try {
        const arquivo = await s3.upload({
            Bucket: process.env.BACKBLAZE_BUCKET,
            Key: nomeArquivo,
            Body: file.buffer,
            ContentType: file.mimetype
        }).promise()
        return arquivo

    } catch (error) {
        return error
    }
}


module.exports = {
    uploadArquivos
}

