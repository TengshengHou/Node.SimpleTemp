const { Pool, Client } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'SimpleTempDb',
    password: 'postgres',
    port: 5432,
});


module.exports =pool;