const express = require("express");
const dbConnect = require("./config/dbconnect");
const app = express();
const dotenv = require("dotenv");
dotenv.config(); 
const PORT = process.env.PORT || 5000;
const authRoute = require('./routes/authRoute');
const bodyParser = require("body-parser");//
const cors = require("cors");


try {
  dbConnect();
} catch (error) {
  console.error("Error connecting to database:", error);
  process.exit(1);
}


const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, HEAD, PATCH",
  credentials: true,
};  
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api/user", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on("error", (error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});