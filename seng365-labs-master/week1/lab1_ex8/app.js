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
    const body = req.body;

    let response = `No user with ID: ${user_id}`;
    for (const user of users) {
        if (user_id === user.id) {
            if (body.message == "view follower"){
                response = user.following;
            }
            else {
                response = user;
            }
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
            if (updatedUser.message == "add follower") {
                user.following.push(updatedUser.follower_id);
            }
            else if (updatedUser.message == "remove follower") {
                let index_of_id = user.following.indexOf(updatedUser.follower_id);
                user.following.splice(index_of_id, 1);
            }
            else {
                const index = users.indexOf(user);
                user[index] = updatedUser;
            }
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
    console.log('connected lab1 - ex8');
})