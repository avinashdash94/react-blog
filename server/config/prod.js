//It is just for to make our keys secure 
//if the project in prodection mode means if it is deployed in external dev enviromnt
//of if the project in local devlopment enviroment

// console.log("Prode"+process.env.MONGO_URI);
module.exports = {
    mongoURI: process.env.MONGO_URI
    // mongoURI: process.env.MONGODB_URI
}