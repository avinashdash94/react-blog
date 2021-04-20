const express = require('express');
const app = express();
const mongoose = require('mongoose');

// this is the url to conect with mongoose
//mongodb+srv://Avinash:<password>@react-blog.ddbru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://Avinash:b3p1591BukU41UlU@react-blog.ddbru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true }) // useNewUrlParser for deprication warning not to come frome mongoose
.then(()=> console.log('DB connected')) 
.catch(err=>{console.error(err)} );



app.get('/', function (req, res) {  
    res.send("Hello world" );  
 })  

app.listen(5001);
