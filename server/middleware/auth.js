const {User} = require("../models/user");

let auth = (req, res, next) => {
    //Here we authenticate by using token which is created at the time of login and saved in the cookie
    let token = req.cookies.x_auth;

    //here we find the user by token 
    //findByToken() is defined in user.js
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) res.json({
            isAuth: false,
            error: true
        });

        //If there is no error then we add some data in response object
        req.token = token;
        req.user = user;
        next();
    });
}

module.exports = { auth }