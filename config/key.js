//It is just for to make our keys secure 
//if the project in prodection mode means if it is deployed in external dev enviromnt
//of if the project in local devlopment enviroment
if(process.env.NODE_ENV === 'production') {
    // console.log("keyprod"+process.env.NODE_ENV);
    module.exports = require('./prod');
}
else{
    // console.log("keydev"+process.env.NODE_ENV);

    module.exports = require('./dev');
}