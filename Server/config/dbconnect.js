const { default: mongoose } = require("mongoose");

const dbConnect = () =>{
    try {
    const conn = mongoose.connect("mongodb://localhost:27017/project_1");
    
    console.log("Database connected successfully");
    } catch (error) {
        console.log("database error")
    }
};

module.exports = dbConnect;
