const express = require("express");
const validator = require('validator');
const pasth = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/logout', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup');
});

//SignUp
app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username
    }

    const mobileRegex = /\b\d{10}\b/;

    const isMobile = mobileRegex.test(req.body.password);
    const isValid = validator.isEmail(req.body.password);

    const existing = await collection.findOne({ name: data.name });
    // const existingEmail = await collection.findOne()
    if (existing) {
        res.send("Username already existed..")
    } else {
        // const saltrounds = 10;
        // const hash = await bcrypt.hash(data.password, saltrounds);

        // data.password = hash;
        const mobileinsert = {
            name: req.body.username,
            password: req.body.password
        }

        const emailinsert = {
            name: req.body.username,
            password: req.body.password
        }

        if (isMobile) {
            const sendata = await collection.insertMany(mobileinsert);
            console.log(sendata)
        } else {
            console.log('Enter Valid Mobile Number');
        }
        if (isValid) {
            const sendata = await collection.insertMany(emailinsert);
            // console.log(sendata)
            console.log(isValid)
        } else {
            console.log(`Email is not valid\n${isValid}`);
        }
        // const sendata = await collection.insertMany(data);
        res.render('login')
    }
});

//Login
app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        const find = await collection.findOne({ name: req.body.username, password: req.body.password });

        const mobileRegex = /\b\d{10}\b/; //Regular expression to validate mobile number

        const isMobile = mobileRegex.test(req.body.password);
        const isValid = validator.isEmail(req.body.password);

        if (!check) {
            res.send("Username Not Found");
        } else {
            if (isMobile) {
                if (find) {
                    console.log('Valid Mobile Number\nLogin Succesfully');
                    res.render('home')
                } else {
                    console.log(`Username or Password is Invalid.`);
                }
            }
            else {
                console.log('Enter Valid Mobile Number\nLogin Failed');
            }

            if (isValid) {
                if (find) {
                    console.log('Valid Email\nLogin Succesfully');
                    res.render('home')
                } else {
                    console.log(`Username or Password is Invalid!`);
                }

            }
            else {
                console.log('Invalid Email\nLogin Failed');
            }
            // res.render('home')
        }
        // const isPassword = bcrypt.compare(req.body.password, check.password)
        // if (isPassword) {
        //     console.log(`Login Succesfully`);
        //     res.render('home')
        // }
    } catch (e) {
        console.log(e);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
})
