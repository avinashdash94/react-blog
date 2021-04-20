const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const {User} = require('./models/user');

// console.log("AVi"+config.mongomongoURI);
// this is the url to conect with mongoose
//mongodb+srv://Avinash:<password>@react-blog.ddbru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongoose.connect('mongodb+srv://Avinash:b3p1591BukU41UlU@react-blog.ddbru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
mongoose.connect(config.mongoURI,
{ useNewUrlParser: true, useUnifiedTopology: true }) // useNewUrlParser for deprication warning not to come frome mongoose
.then(()=> console.log('DB connected')) 
.catch(err=>{console.error(err)} );

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, userData) => {
        if(err) return res.json({success: false, err});

        return res.status(200).json({
            success:true
        });
    });
    
})




app.get('/', function (req, res) {  
    // res.send("Hello world" );  
    res.json("Hello Json" );  
 })  

app.listen(5000);
