/* eslint-disable @typescript-eslint/no-var-requires */
/*eslint no-undef: "off"*/
const express = require('express') 
const mysql = require('mysql2/promise');
const cors = require("cors");
const moment = require("moment")
var http = require('http');

/* === [S]Server Setting Line === */
const app = express();
require("dotenv").config({ path: '../.env' });

const port = 5000;
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

app.set('json spaces', 2)

app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
}));
/* === [E]Server Setting Line === */

app.listen(port, () => {
  console.log(`HUBPRO Running in http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Testing String!');
});

app.get('/gas/get/recent', async (req, res) => {
  let connection;
  try {
    res.header("Access-Control-Allow-Origin", "*")
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      `
      SELECT * FROM gas_log_tb gltb left join module_tb mtb ON mtb.module_idx = gltb.module_idx order by log_idx desc limit 4
      `
    )

    const formattedRows = rows.map(row => {
      const formattedDate = moment(row.rgst_dt).format('YYYY-MM-DD HH:mm:ss');
      return { ...row, rgst_dt: formattedDate };
    });

    res.status(200).json(formattedRows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  } finally {
    if (connection) {
      await connection.end()
    }
  }
});

// app.post('/accident/add', async (req, res) => {
//   try {
//     res.header("Access-Control-Allow-Origin", "*"); // CORS 에러때문에 추가함
//     const connection = await mysql.createConnection(dbConfig);

//     const latitude = req.query.latitude;
//     const longitude = req.query.longitude;

//     const [result] = await connection.execute(
//       `
//       INSERT INTO accident_tb (latitude, longitude)
//       VALUES (?, ?);
//       `,
//       [latitude, longitude]
//     );

//     res.status(201).json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Internal server error');
//   }
// });