const { connect } = require('mongoose');

const dbConnection = async () => {

    try {
        await connect(process.env.DB_CNN);
        console.log('DB Online')
    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar la base de datos')
    }
}

module.exports = {
    dbConnection,
}