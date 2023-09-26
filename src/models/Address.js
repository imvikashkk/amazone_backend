import mongoose from "mongoose";

/* Creating Schema */
const addressSchema = new mongoose.Schema({
      name: String,
      mobile: Number,
      building: String,
      street: String,
      landmark: String,
      pincode: Number,
      town_city: String,
      state: String,
});


/* Creating Model */
const Address = mongoose.model("Address", addressSchema);

export default Address;
