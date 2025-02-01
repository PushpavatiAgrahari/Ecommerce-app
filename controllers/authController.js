// const hashPassword = require("../helpers/authHelpers");
// const userModel = require("../models/userModel");
// const jwt = require('jsonwebtoken');

// const resgisterController= async(req,res)=>{
//     try
//     {
//     const {name,email,password,phone,address}=req.body
//     //validation

//     if(!name)
//     {
//         return res.send({message:"Name is Required"})
//     }
//     if(!email)
//     {
//         return res.send({message:"Email is Required"})
//     }
//     if(!password)
//     {
//         return res.send({message:"Password is Required"})
//     }
//      if(!phone)
//     {
//          return res.send({message:"Phone  no is Required"})
//     }
//     if(!address)
//      {
//          return res.send({message:"Address is Required"})
//     }

//     // checkuser
//     const exsitingUser=await userModel.findOne({email})
//     //exsitinguser
//     if(exsitingUser)
//     {
//         return res.status(200).send({
//             success:false,
//             message:'Already Register please login',
//         })
//     }
    

//     // register user 
//     const hashedPassword=await hashPassword(password)

//     //save 
//     const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()

//     res.status(200).send({
//         success:true,
//         message:'USer Register Successfully',
//         user,
//     });

//     }catch(error)
//     {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:'Error in Registeration',
//             error
//         })
//     }

// };


// // post login
// const loginController=async(req,res)=>{
//     try{

//         const {email,password}=req.body
//         if(!email || !password)
//         {
//             return res.status(404).send({
//                 success:false,
//                 message:"Invalid email or password",
//             })
//         }
//           // checkuser
//     const user=await userModel.findOne({email})
//     if(!user)
//     {
//         return res.status(404).send(
//             {
//                 success:false,
//                 message:"Email is not Register",
//             }
//         )
//     }
//     const match=await comparePassword(password,user.password)
//     if(!match){
//         return res.status(200).send({
//             success:false,
//             message:"Invalid Password",
//         })
//     }

//     // create token
//     const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{
//      expiresIn:"7d",
//     });
//     res.status(200).send({
//         success:true,
//         message:"Login Successfully",
//         user:{
//             name:user.name,
//             email:user.email,
//             phone:user.phone,
//             address:user.address
//         },
//         token,
//     });

//  }catch(error)
//     {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:"Error in login",
//             error
//         })
//     }

// }


// // test Controller

// const testController=(req,res)=>{
//     try
//     {
//     res.send("protected route")
//     }catch(error)
//     {
//         console.log(error);
//         res.send({error});
//     }
// // console.log("protected route")

// }
// module.exports={resgisterController,loginController,testController}


//


const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register Controller
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,answer } = req.body;

        // Validation
        if (!name) return res.status(400).send({ message: "Name is required" });
        if (!email) return res.status(400).send({ message: "Email is required" });
        if (!password) return res.status(400).send({ message: "Password is required" });
        if (!phone) return res.status(400).send({ message: "Phone number is required" });
        if (!address) return res.status(400).send({ message: "Address is required" });
        if (!answer) {
            return res.send({ message: "Answer is Required" });
          }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already registered. Please login.",
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Save the new user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer,
        }).save();

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};

// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required",
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found. Please register first.",
            });
        }

        // Check if password matches
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Invalid password",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
            },
            token,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};
////forgotPasswordController

 const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };


// Test Controller
const testController = (req, res) => {
    try {
        res.status(200).send({ message: "Protected route accessed successfully" });
    } catch (error) {
        console.error("Error in test route:", error);
        res.status(500).send({ error });
    }
};




//update prfole
const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };


  //orders
const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
 const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
 const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
module.exports = { registerController, loginController, testController,forgotPasswordController 
  ,updateProfileController,getOrdersController,orderStatusController,getAllOrdersController};