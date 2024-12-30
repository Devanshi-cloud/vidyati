import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/User.js";

const router = express.Router();

//Setting up Multer for file upload
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "public/uploads/") // staring the uploaded files in this folder this folder
    },
    filename: function (req,file,cb){
        cb(null, file.originalname); // saving the file with the original name
    },
});
const upload = multer({storage})

//user register
router.post("/register", upload.single("profileImage"), async (req, 
    res)=>
    {
    try {
        //Get all information from the form
        const {firstName,lastName,email,password} = req.body;
        // The uploaded file is available as req.file
        const profileImage = req.file;

        if(!profileImage) {
            return res.status(400).send("No file uploaded")
        }

        //path of uploaded profile image
        const profileImagePath = profileImage.path

        //checking if user exist
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(409).json({message:"User already exists!"})
        }

        //Hashing the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);

        // Creating a new User
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            profileImagePath,
        });
        //Saving the new user
        await newUser.save();
        // if successful send successful message
        res.status(200).json({message:"User created successfully!", user:newUser });
    } catch (err) {
        console.log(err)
        res.status(500).json({message:"User Registeration failed",
            error:err.message})
    }
});

//User Login
router.post("/login", async (req, res) => {
    try {
        const {email,password} = req.body

        //checking if user exist
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message:"User doesn't exist!"})
    }

    //Compare the password with hashedPassword
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        return res.status(400).json({message:"Invalid Credentials!"})
}

//Generate JWT token
const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
delete user.password

res.status(200).json({token, user})
    } catch (err) {
        console.log(err)
        res.status(500).json({error:err.message})
    }
    });
export default router;