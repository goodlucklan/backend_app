
const express = require('express');
const app = express();
const bcryptjs = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
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
app.listen(4000, () => {
    console.log('app is working');
})
