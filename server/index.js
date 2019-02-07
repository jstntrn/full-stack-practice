const express = require('express');
const massive = require('massive');
require('dotenv').config()
const { SERVER_PORT, DB_CONNECTION, SESSION_SECRET } = process.env
const ctrl = require('./controllers/controller')
const session = require('express-session')

const app = express();
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUnitialized: false,
    maxAge: null
}));

massive(DB_CONNECTION).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`full-stack on port ${SERVER_PORT}`));
})

app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)