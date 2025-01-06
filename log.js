const express = require('express');
const mongoose = require('mongoose');
const Data = require('./models/data');


const bodyParser = require('body-parser');
mongoose.connect("mongodb+srv://abdoosama00:Abdo00000@test.1lmps.mongodb.net/?retryWrites=true&w=majority&appName=test")
.then(()=>{
    console.log("done1");
}).catch((error)=>{
console.log(error);
})

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/log.html'); // Ensure the HTML file is saved as 'index.html' in the same directory
});

// Handle login form submission

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const Datas = await Data.find();
       
        let isAuthenticated = false;
        Datas.forEach(data => {
            if (data.email === email && data.password === password) {
                isAuthenticated = true;
            }
        });

        
        if (isAuthenticated) {
            res.sendFile(__dirname + '/welcome.html');
        } else {
            res.sendFile(__dirname + '/faild.html');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});


app.post('/signup', async (req, res) => {
    const { email, name, password } = req.body;

    try {
        // Check if email or name already exists in the database
        const existingUser = await Data.findOne({ $or: [{ email }, { name }] });

        if (existingUser) {
            // If the user already exists, return an appropriate message
            return res.status(400).sendFile(__dirname + '/taken.html');
        }

        // Create a new user and save it
        const newUser = new Data({ name, email, password });
        await newUser.save();

        // Send success response
        res.sendFile(__dirname + '/sign up.html');
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal server error");
    }
});

   


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
