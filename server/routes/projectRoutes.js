const {json} = require("express");
const router = require('express').Router();
const Room = require("../models/room.js");
const User = require("../models/user.js");
const Project = require("../models/project.js");

router.post("/getallroomprojects", async(req, res)=>{
    try{
        const {room_id, room_password} = req.body;
        const room = await Room.findOne({_id: room_id})
        if(room.password === room_password){
            const projects = await Project.find({roomId: room_id});
            res.send(projects)
        }else{
            res.status(400).json({message: "the password doesn't match"})
        }
    }catch(error){
        res.status(400).json({message: error})
    }
})


router.post("/get-all-projects", async(req, res)=>{
    try{
        const {userid} = req.body;
        const admin = await User.findOne({_id:userid})
        if(admin){
            if(admin.status === "ADMIN"){
                const rooms = await Project.find({})
                return res.send(rooms)
            }
        }
        
    }catch(err){
        return res.status(400).json({message: err})
    }
})

router.post("/addproject", async(req, res)=>{
    const {name, creatorId, roomId, maximum, history, users} = req.body;
    // console.log(users)
    try{
        
        users.push(creatorId)
        // console.log(users)
        const myRoom = await Room.findOne({_id: roomId});
        myRoom.history.push({"type": "Creation d'un projet", "user": creatorId});
        myRoom.users.push(creatorId);
        await myRoom.save();
        
        console.log(myRoom)
        const new_project = new Project({name, creatorId, roomId, maximum, history, users, rows: [], cols: [], solde: 0});
        await new_project.save();

        res.send("New project was added successfully");

    }catch(error){
        res.status(400).json({message: error})
    }
})

router.post("/singleproject", async(req, res)=>{
    const {roomId, projectId, userId} = req.body 
    try {
        const thisroom = await Room.findOne({_id: roomId})
        if (thisroom.users.includes(userId)){
            const thisproject = await Project.findOne({_id: projectId});
            res.send(thisproject);
        }else{
            res.status(400).json({message: "you do not have access to this project!"});
        }
         
    }catch(error){
        res.status(400).json({message: error})
    }
})

router.post("/deleteproject", async(req, res)=>{
    const {room_id, project_id,creatorId, password, user_id} = req.body
    // console.log(req.body)
    try{
        const thisroom = await Room.findOne({_id: room_id})
        if(thisroom){
            // console.log("here")
            if((thisroom.creatorId === user_id && thisroom.password === password)||( creatorId === user_id && thisroom.password === password)){
                await Project.findOneAndDelete({_id: project_id});
                res.send("success")
            }else{
                res.status(400).json({message: "no Permission !"})
            }
        }
        
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.post("/updateproject", async(req, res)=>{
    const {rows, cols, userid, projectid, solde} = req.body;
    try{
        const thisproject = await Project.findOne({_id: projectid})
        
        thisproject.rows = rows;
        thisproject.cols = cols;
        thisproject.solde = solde;
        await thisproject.save();
        res.send("updated");
        
    }catch(error){
        // console.log(error)
        res.status(400).json({message: error.message})
    }
})

module.exports = router;