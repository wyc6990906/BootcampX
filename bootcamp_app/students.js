require('dotenv').config()
const pg = require('pg')
const config = {
  user: process.env.PSQL_USER,
  host: process.env["PSQL_HOST "],
  database: process.env.PSQL_DB
};
const client = new pg.Client(config)
client.connect()

const cohort = process.argv[2];
const limit = process.argv[3] || 5;

const values = [`%${cohort}%`, limit]
const queryString = (`
    SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
    FROM students
             JOIN cohorts ON cohort_id = cohorts.id
    WHERE cohorts.name LIKE $1
    LIMIT $2;
`);
client.query(queryString, values)
  .then(res => {
    for (row of res.rows) {
      console.log(`${row.name} has an id of ${row.student_id} and was in the ${res.cohort} cohort`);
    }
    client.end();
  })
  .catch(err => console.error('query error', err.stack));
