const { s3 } = require('./conexaoS3')

const excluirArquivo = async (path) => {

    try {
        await s3.deleteObject({
            Bucket: process.env.BACKBLAZE_BUCKET,
            Key: path
        }).promise()

    } catch (error) {
        return error
    }
}


module.exports = {
    excluirArquivo
}

