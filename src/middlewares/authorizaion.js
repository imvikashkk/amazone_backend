import jwt from "jsonwebtoken";
import secretKey from "../utils/secretKey.js";
import User from "../models/User.js";

const authorization = async (req, res, next) => {
  try {

    /* Access authkey from header */
    const {authkey} = req.headers;
    // console.log(authkey);
    
    /* Check authkey exist or not */
    if (!authkey) {
      return res.status(400).json({
        success: false,
        statusmessage: "Bad Request",
        message: "Required header element authkey is not exist !!",
      });
    }

    /* decode jwt token */
    const id = jwt.verify(authkey, secretKey).userId;


    /* finding the user */
    const user = await User.findOne({_id:id});
    
    /* check user exist or not */
    if(!user){
      return res.status(404).json({
        succes: false,
        statusmessage: "Bad Request",
        message:"User Doest not Exist"
      })
    }
    
    /* check user verified or not */
    if(user.verified === false){
      return res.status(401).json({
        success : false,
        statusmessage: "Unauthorized",
        message: "Email is not verified ... "
      })
    }

    /* set to the reqest and pass middleware */
    req.userId = id;
    next();

  
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ success: false,statusmessage: "Internal Server Error !!", message: "Error while authorizaion !!" });
  }
};

export default authorization;
