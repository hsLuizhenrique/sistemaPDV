const { pool } = require('../../connection/conexao')

const validaIdUsuarios = async (id) => {

    try {
        const pesquisaId = await pool.query('SELECT id FROM usuarios WHERE id = $1', [id])
        if (pesquisaId.rows[0].id === undefined) {
            throw new error(` Não existe ID de usuário com o numero ${id}`)
        }
        return true
    }
    catch (error) {
        return error
    }

}


module.exports = {
    validaIdUsuarios
}