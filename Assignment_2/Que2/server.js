const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const FileStore = require('session-file-store')(session);

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: './session-data' })
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        if (username == 'CharmiModi' && password == 'Modi@11') {
            req.session.username = 'CharmiModi';
            return res.redirect('/dashboard');
        } else {
            res.send("<script>alert('Not Authorized'); window.location.href = '/';</script>");
        }
    } else {
        res.send("<script>alert('Please fill form properly..'); window.location.href = '/';</script>");
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.username) {
        res.send('UserName: ' + req.session.username + ' has logged in..');
    }
});

app.listen(8002, () => console.log("Listening port 8002"));