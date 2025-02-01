 const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//  products:[{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"Product",
//  },],
//  payment:{},
//  buyer:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User",
//  },
//  status:{
//     type:String,
//     default:"Not Process",
//     enum:["Not Process","Processing","Shipped","Deliverd","cancel"],
//  }
// }, { timestamps: true });




//

const orderSchema = new mongoose.Schema(
    {
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      payment: {
        method: { type: String, enum: ["Online", "COD"], default: "COD" },
        status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
      },
      buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('Order',orderSchema)