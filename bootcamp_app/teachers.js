const pg = require('pg')
const config = {
  user: 'yichuanwang',
  host: 'localhost',
  database: 'yichuanwang'
};
const values = [process.argv[2] || 'JUL02']
const client = new pg.Client(config)
client.connect()
client.query(`
    SELECT teachers.name, cohorts.name AS cohort
    FROM assistance_requests
             JOIN teachers ON assistance_requests.teacher_id = teachers.id
             JOIN students ON assistance_requests.student_id = students.id
             JOIN cohorts ON students.cohort_id = cohorts.id
    WHERE cohorts.name = $1
    GROUP BY teachers.name, cohorts.name
    ORDER BY teachers.name;
`, values)
  .then(res => {
    res.rows.forEach(row => console.log(`${row.cohort}: ${row.name}`));
    client.end();
  })
  .catch(err => console.error('query error', err.stack));
