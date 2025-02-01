// const  bcrypt=require('bcrypt')

// const hashPassword=async(password)=>{
//     try{
//         const saltRounds=10;
//         const hashedPassword=await bcrypt.hash(password,saltRounds)
// return hashedPassword
//     }
//     catch(error)
//     {
//         console.log(error)
//     }
// };

// const comparePassword=async(password,hashedPassword)=>{
//     return bcrypt.compare(password,hashedPassword)
// }

// module.exports = {hashPassword,comparePassword}

//



const bcrypt = require("bcrypt");

// Hash Password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error("Error while hashing password:", error);
        throw new Error("Password hashing failed");
    }
};

// Compare Passwords
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error while comparing passwords:", error);
        throw new Error("Password comparison failed");
    }
};

module.exports = { hashPassword, comparePassword };