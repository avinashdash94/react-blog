const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const { User } = require('./models/user');
const{ auth } = require('./middleware/auth');

// console.log("AVi"+config.mongomongoURI);
// this is the url to conect with mongoose
//mongodb+srv://Avinash:<password>@react-blog.ddbru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(config.mongoURI,
{ useNewUrlParser: true, useUnifiedTopology: true }) // useNewUrlParser for deprication warning not to come frome mongoose
.then(()=> console.log('DB connected')) 
.catch(err=>{console.error(err)} );

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//This method is used for authentication after user loged in
app.get('/api/user/auth', auth, (req, res) => {// here we import auth.js and use to check authentication 
    res.status(200).json({ //if succesfully authnticated then return the json data
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    })
});

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({success: false, err});
        res.status(200).json({
            success:true,
            userData: doc
        });
    });
    
});

//for log in
app.post('/api/user/login', (req, res) => {
    // finde email in Db exist or not
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) //if user is not exit
        return res.json({
            loginSuccess: false,
            message: "Authentication failed, email not found"
        });
        // compare  the password with Db password

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
            return res.json({
                loginSuccess: false, message: "wrong password"
            })
        })

        //generate the token
        user.generateToken((err, user) => {
            if(err) return res.status(400).send(err);
            //Now we put the token into the cooke
            res.cookie("x_auth", user.token)
            .status(200)
            .json({
                loginSuccess:true
            })
        })
    })   
    
})


app.get('/', function (req, res) {  
    // res.send("Hello world" );  
    res.json("Hello Json" );  
 })  

app.listen(5000);
