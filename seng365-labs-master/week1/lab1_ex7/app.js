const express = require('express');
const app = express();

const data = require('./users.json');
const users = data.users;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

console.log(users);

app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:id', (req, res) => {
    const user_id = parseInt(req.params.id);

    let response = `No user with ID: ${user_id}`;
    for (const user of users) {
        if (user_id === user.id) {
            response = user;
            break;
        }
    }
    res.status(200)
        .send(response);
});

app.post('/users', (req, res) => {
    const newUser = req.body;

    users.push(newUser);
    res.status(201).send(users);
});

app.put('/users/:id', (req, res) => {
    const user_id = parseInt(req.params.id);
    const updatedUser = req.body;

    for (const user of users) {
        if (user_id === user.id) {
            const index = users.indexOf(user);
            user[index] = updatedUser;
            break;
        }
    }
    res.status(200).send(updatedUser);
});

app.delete('/users/:id', (req, res) => {
    const user_id = parseInt(req.params.id);

    for (const user of users) {
        if (user_id === user.id) {
            const index = users.indexOf(user);
            users.splice(index, 1);
        }
    }
    res.send(users);
});

app.listen(3000, () => {
    console.log('connected to USERS...');
})