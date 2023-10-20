const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const mysql = require('mysql2');

env.config();
const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = 3000;

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'book_comment'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});


app.get('/', (req, res) => {
    connection.query(
        'SELECT title, books.isbn, comments FROM books inner join comments on comments.isbn = books.isbn',
        (error, results) => {
            if (error) throw error;
            res.send(results);
        }
    );
});

app.post('/book/post', (req, res) => {
    const title = req.body.title;
    const isbn = req.body.isbn;
    const query = `insert into books (title, isbn) select * from (select '${title}' as title, '${isbn}' as isbn) as tmp where not exists (select * from books where title='${title}' and isbn='${isbn}')`

    connection.query(
        query,
        (error, results) => {
            if (error) throw error;
            console.log('book insert');
        }
    );
})

app.post('/comment/post', (req, res) => {
    const isbn = req.body.isbn;
    const comment = req.body.comment;

    const query = `insert into comments (isbn, comments) values ('${isbn}', '${comment}')`;


    connection.query(
        query,
        (error, results) => {
            if (error) throw error;
            console.log(results);
        }
    );

})

app.listen(PORT, () => {
    console.log('Start Server');
});