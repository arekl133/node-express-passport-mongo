const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended:false}));

const users = [];

app.get('/',(req,res) => {
    res.render('index.ejs')
});

app.get('/login',(req,res) => {
    res.render('login.ejs')
});

app.get('/register',(req,res) => {
    res.render('register.ejs')
});


app.post('/register', (req, res) => {
    try{
        const passwordHash = bcrypt.hashSync(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: passwordHash
        })
        res.redirect("/login");

    }catch{
        res.redirect("/register")
    }
    console.log(users);
});

app.listen(3005);