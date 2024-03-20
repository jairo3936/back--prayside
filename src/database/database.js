import mysql from 'promise-mysql'
import config from './../config'

const connection = mysql.createConnection({
    port: config.port,
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    db_port: config.db_port
});

const getConnection = () => {
    return connection;
}

module.exports = {
    getConnection
};