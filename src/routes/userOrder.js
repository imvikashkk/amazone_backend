import express from 'express';
import NewOrder from '../controllers/NewOrder.js';
import authorization from '../middlewares/authorizaion.js';
import GetOrderList from '../controllers/GetOrderList.js';

const userOrder = express.Router()
        userOrder
        .post("/neworder", authorization ,NewOrder)
        .get("/orderlist", authorization ,GetOrderList)

export default userOrder