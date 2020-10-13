
const express = require('express');
const app = express();
const bcryptjs = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const write = require('write');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const fs = require('fs');
// const writing = require('./controllers/write')
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(cors());
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

app.post('/singin', signin.handleSignIn(db, bcryptjs));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcryptjs) });
app.get('/profile/:id', (req, res) => { profile.handleprofile(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageURL', (req, res) => { image.handleApiCall(req, res) });
app.post('/write', (req, res) => {
    if (!req.body.img) { return res.status(400).json('incorrect') }
    try {
        fs.appendFile('foo.txt', req.body.img, ((err) => {
            if (err) throw err
        }))
        res.status(200).json('correct')
    } catch (err) {
        throw err
    }
})
app.get('/getImg', (req, res) => {
    fs.readFile('foo.txt', 'utf8', (err, data) => {
        if (err) throw err;
        let array = data.toString().split("\n");
        res.status(200).json(array);
    })
})
app.listen(4000, () => {
    console.log('app is working');
})
