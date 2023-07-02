const express = require("express");
const serverConfig = require("./config/server.config.js")
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config.js")
const userModel = require("./model/user.model.js")

const app = express();

/**
 * Logic to connect to MongoDB and create an ADMIN user
 * Need to have the mongodb up and running in your local machine
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting");
})

db.once("open", () => {
    console.log("DB is connected");

    init();
})

async function init() {
    // Check if the admin user already present 
    let admin = await userModel.findOne({
        userId: "admin"
    })
    if(admin) {
        console.log("Admin user already present");
        return;
    }
    // Initialize the mongo DB
    // Need to create the ADMIN user

    admin = await userModel.create({
        name : " Satyam Jhs",
        userId : "admin",
        email: "satyamkumarjha9696@gmail.com",
        userType: "ADMIN",
        password: "sat1"
    });
    console.log(admin);
}


app.listen(serverConfig.PORT, () => {
    console.log(`Port is listening on ${serverConfig.PORT}`);
})