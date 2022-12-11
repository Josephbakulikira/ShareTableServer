const {json} = require("express");
const router = require('express').Router();
const Room = require("../models/room.js");
const User = require("../models/user.js");

router.post("/addroom", async(req, res)=>{
    try{
        const {name, creatorId, password, history, users, files} = req.body;
        const CurrentUser = await User.findOne({_id: creatorId});
        if (CurrentUser){
            console.log(CurrentUser)
            const new_room = new Room({name, creatorId, password, history, users, files});
            await new_room.save();
            res.send("new room added Successfully");
            
        }else{
            res.status(400).json("user not in database");
        }

    }catch(error){
        return res.status(400).json({message: error});
    }
})

router.post("/getallrooms", async(req, res)=>{
    try{
        const {userid} = req.body;
        const admin = await User.findOne({_id:userid})
        if(admin){
            const rooms = await Room.find({})
            return res.send(rooms)
        }
        
    }catch(err){
        return res.status(400).json({message: err})
    }
})

router.post("/getroombyid", async(req, res)=> {
    const {room_id, user_id} = req.body
    try{
        const room = await Room.findOne({_id: room_id})
        if(room.users.includes(user_id))
            return res.send(room)
        else{
            return res.status(400).json({message:"no permission"})
        }
    }catch(error){
        return res.status(400).json({message: error.message})
    }
})

router.post("/addusertoroom", async(req,res)=>{
    const {room_id, user_id, password} = req.body;
    try{
        const room = await Room.findOne({_id: room_id})
        if(room){
            console.log(room)

            if(room.password === password){
                room.users.push(user_id)
                await room.save()
                res.send(room)
            }else{
                res.status(400).json({message: "mot de passe incorrecte"})
            }
        }
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.post("/removeusertoroom", async(req,res)=>{
    const {room_id, user_id, creatorId} = req.body;
    try{
        const room = await Room.findOne({_id: room_id})
        if(room){
            console.log(room)

            if(room.creatorId === creatorId){
                room.users.pull(user_id)
                await room.save()
                res.send(room)
            }else{
                res.status(400).json({message: "no permission"})
            }
        }
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.post("/deleteroom", async(req, res)=>{
    try{
        const {room_id, user_id} = req.body
        //const roomtodelete = await Room.findOne({_id: roomid})
        //const currentUser = await User.findOne({_id: user_id})
        const roomtodelete = await Room.findOne({_id: room_id});
        const user = await User.findOne({_id: user_id})
        // console.log(currentUser)
        // console.log(roomtodelete)
        if(roomtodelete.creatorId === user_id){
            await Room.findOneAndDelete({_id: room_id})
            res.send("room deleted Successfully!")
            
        } else if(user){
                if(user.status === "ADMIN"){
                    await Room.findOneAndDelete({_id: room_id})
                    res.send("room deleted Successfully!")
                }
            }
        
        else{
            res.status(400).json({message: "the user is not the creator of this room"})
        }
    }catch(error){
        return res.status(400).json(error.message)
    }
})

module.exports = router;