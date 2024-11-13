const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const { v4: uuidv4 } = require('uuid')

const resultDotnev = dotenv.config(path.resolve(__dirname, '../.env'));

console.log(resultDotnev)
console.log({
    user: resultDotnev.parsed?.BD_USER,
    host: resultDotnev.parsed?.BD_HOST,
    database: resultDotnev.parsed?.BD_DATABASE,
    password: resultDotnev.parsed?.BD_PASS,
    port: resultDotnev.parsed?.BD_PORT
  })
const pool = new Pool({
    user: resultDotnev.parsed?.BD_USER,
    host: resultDotnev.parsed?.BD_HOST,
    database: resultDotnev.parsed?.BD_DATABASE,
    password: resultDotnev.parsed?.BD_PASS,
    port: resultDotnev.parsed?.BD_PORT,
    ssl: {
        rejectUnauthorized: false, 
    },
  });

module.exports = {
    insertTest: async (body) => {
        const { name, passed, groupId, given, when, then, executionTimeMs, escope, testType, startedDate, endDate } = body;

        const id = uuidv4();

        await pool.query(
            `
            INSERT INTO test 
                ("id", "passed", "name", "group_id", "given", "when", "then", "execution_time_ms", "escope", "test_type", "start_date", "end_date") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            `,
            [id, passed ? 1 : 0, name, groupId, given, when, then, Math.round(executionTimeMs), escope, testType, startedDate, endDate]
        );

        return id;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM test WHERE id = $1', [id]);

        return (result?.rows || [null])[0];
    }
}