const express =require('express');
const { registerController ,loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} = require('../controllers/authController');
const {requireSignIn,isAdmin} = require('../middlerware/authMiddlerware');

//router object

const authRoute = express.Router();

//rotuing 
//register ||method post

authRoute.post('/register',registerController);

//Login ||Post

authRoute.post('/login',loginController);

//Forgot Password || POST
authRoute.post("/forgot-password", forgotPasswordController);

//test routes

authRoute.get('/test',requireSignIn,isAdmin,testController)
//user route
authRoute.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

//admin route 
authRoute.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });



  //update profile
  authRoute.put("/profile", requireSignIn, updateProfileController);

  //orders
  authRoute.get("/orders", requireSignIn, getOrdersController);

//all orders
authRoute.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
authRoute.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);


module.exports = authRoute
