const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
    
    try{
        const {name, email, phonenumber, password, confirmPassword, departement, title, status} = req.body;

        // validation
        if(!email || !password || !confirmPassword){
            return res.status(400).json({errorMessage: "Please enter all the required field ."})
        }
        if(password.length < 6){
            return res.status(400).json({
                errorMessage: "Please enter a Password of at least 6 characters"
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                errorMessage: "Please enter the same password twice. "
            });
        }

        const existingUser = await User.findOne({
            email: email
        })
        if(existingUser){
            return res.status(400).json({
                errorMessage: "An account with this email already exist."
            });
        }
        // Hash the user password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        // save the new user account to the db
        const newUser = new User({
            name, email, phonenumber, password:passwordHash, departement, title, status:"normal"
        })
        const savedUser = await newUser.save();

        // sign the token
        const token = jwt.sign({
            user: savedUser._id
        },
            process.env.JWT_SECRET 
        )

        // send the token in a HTTP-only cookie

        // res.cookie("token", token, {
        //     httpOnly: true
        // }).send();
        res.send("successfully registered")


    }catch(err){
        console.log(err);
        res.status(500).send();
    }
});

// log in

router.post("/login", async(req, res)=>{
    try{
        const {email, password} = req.body;

        //validate
        if(!email || !password){
            return res.status(400).json({
                errorMessage: "Please enter all the required field"
            })
        }

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(401).json({
                errorMessage: "Wrong email or password"
            })
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!passwordCorrect)
            return res.status(401).json({errorMessage: 'Wrong email or password.'});
        
        // sign the token
        const token = jwt.sign({
            user: existingUser._id
        },
            process.env.JWT_SECRET 
        )
        //const user = await User.findOne({email:email, password: password})
        // const temp = {
        //         name: user.name,
        //         email: user.email,
        //         isAdmin: user.isAdmin,
        //         _id: user._id
        //     }
         res.cookie("token", token, {
            httpOnly: true
        }).send(existingUser);
        
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
});

router.get("/logout", (req, res)=>{
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send(); 
})

router.get("/loggedIn", (req, res)=>{
    try{
        const token = req.cookies.token;
        if(!token) return res.json(false)
        jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);
    }catch(err){
        res.json(false);
    }
});

router.post("/getallusers", async(req, res)=>{
    try{
        const {userid} = req.body;
        const admin = await User.findOne({_id: userid})
        console.log("users")
        if(admin){
            // console.log(admin)
            if(admin.status === "ADMIN"){
               const users = await User.find()
            //    console.log(users)
                res.send(users)
            }
        }
    }catch(error){
        res.status(400).json({error})
    }
})

router.post("/toggleadmin", async(req, res)=>{
    const {userid, currentUserid} = req.body;

    try{
        const CurrentUser = await User.findOne({_id: currentUserid});
        const thisUser2 = await User.findOne({_id: userid});
        if(CurrentUser.isAdmin){
            if(thisUser2.isAdmin == false){
                const thisUser = await User.updateOne({_id: userid}, {$set: {isAdmin: true}});
                const temp = await User.findOne({_id: userid});
                res.send(temp)

            }
            else{
                const thisUser = await User.updateOne({_id: userid}, {$set: {isAdmin: false}});
                const temp = await User.findOne({_id: userid});
                res.send(temp)
            }
        }else{
            res.status(400).json({message: "Don't have permission"});   
        }
    }catch(err){
        res.status(400).json({message: err})
    }
})

router.post("/deleteuser", async(req, res)=>{
    const {userid, id} = req.body
    try{
        const user = await User.findOne({_id: userid});
        if(user){
            if(user.status === "ADMIN"){
                await User.findOneAndDelete({_id: id})
                res.send("user deleted")
            }
        }
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// router.post("/register", async(req, res)=>{
//     const newuser = new User(req.body)

//     try{
//         const user = await newuser.save()
//         return res.send("User registered successfully")
//     }catch(error){
//         return res.status(400).json({error})
//     }
// });

// router.post("/login", async (req, res)=>{
//     const {email, password} = req.body
//     try{
//         const user = await User.findOne({email:email, password: password})
//         if(user){
//             const temp = {
//                 name: user.name,
//                 email: user.email,
//                 isAdmin: user.isAdmin,
//                 _id: user._id
//             }
//             return res.send(user)
//         }else{
//             return res.status(400).json({message: "Login failed "})
//         }
//     }catch(error){
//         return res.status(400).json({error})
//     }
// })

module.exports = router