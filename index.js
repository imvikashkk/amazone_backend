import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import mongoose from "mongoose";

import userAuth from "./src/routes/userAuth.js";
import userData from "./src/routes/userData.js";
import userOrder from "./src/routes/userOrder.js";
import RainforestAPI_Data from "./src/controllers/RainforestAPI_Data.js";

const app = express();
const PORT = 8000;

/* MiddleWares */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


/* Routes */
app.use("/api/user/auth", userAuth)  // Login Signup ResetPassword Email Verification OTP Verification
app.use("/api/userdata", userData)
app.use("/api/userorder", userOrder)

/* RainForest Amazone Data */
app.get("/api/rainforestdata", RainforestAPI_Data)


/* Connecting To DataBase and Running the Server*/
mongoose.connect("mongodb+srv://imvikashkk:Vikash2003@cluster0.aehxedm.mongodb.net/amazone?retryWrites=true&w=majority", {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
}).then(() => {
        console.log("Connected to mongoDB Successfully !!");
        app.listen(PORT, () => {
            console.log("Server is running......................")
        })
    }).catch((err) => {
        console.log("Error : connecting to MongoDB Failed !!")
    })