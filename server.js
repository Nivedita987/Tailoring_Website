const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3018;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/tailoring_web',);
const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB Connection successful");
});

// Define Schemas and Models
const userLoginSchema = new mongoose.Schema({
    email: String,
    password: String
});

const userSignupSchema = new mongoose.Schema({
    username: String,
    pass: String,
    confpass: String
});

const UserLogin = mongoose.model("UserLogin", userLoginSchema);
const UserSignup = mongoose.model("UserSignup", userSignupSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = new UserLogin({
        email,
        password
    });

    await user.save();
    console.log(user);
    res.send("Login Successful!!!");
});

app.post('/signup', async (req, res) => {
    const { username, pass, confpass } = req.body;
    const user = new UserSignup({
        username,
        pass,
        confpass
    });

    await user.save();
    console.log(user);
    res.send("Signup Successful!!!");
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});
