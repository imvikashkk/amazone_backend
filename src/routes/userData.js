import express from "express";
import AddNewAddress from "../controllers/AddNewAddress.js";
import authorization from "../middlewares/authorizaion.js";
import DeleteAddresss from "../controllers/DeleteAddress.js";
import GetAddresses from "../controllers/GetAddresses.js";
import UpdateAddress from "../controllers/UpdateAddress.js";
import SetDefaultAddress from "../controllers/SetDefaultAddress.js";
import GetDefaultAddress from "../controllers/GetDefaultAddress.js";

const userData = express.Router()
 
    userData
        .post("/addnewaddress", authorization ,AddNewAddress)
        .get("/getaddresses", authorization, GetAddresses)
        .delete("/deleteaddress", authorization, DeleteAddresss)
        .post("/setdefaultaddress", authorization, SetDefaultAddress)
        .patch("/updateaddress", authorization, UpdateAddress)
        .get("/getdefaultaddress", authorization, GetDefaultAddress)

export default userData 