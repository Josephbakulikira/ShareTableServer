const Notification = require("../models/notification.js");
const User = require("../models/user.js");
const router = require("express").Router();

router.get("/getallnotifications", async(req, res)=>{
    try{
        const allnot = await Notification.find({});
        if(allnot){
            if(allnot.length > 5){
                await Notification.deleteMany({})
                 // will remove the first element from arrayField
            }
        }
        return res.send(allnot);
    }catch(err){
        res.status(400).json({message: err})
    }
})

router.post("/addNotification", async(req, res)=>{
    try{
        const {id, content } = req.body
        const user = await User.findOne({_id: id})
        if(user){
            const new_notification = new Notification({id: id, content: content, name: user.name})
            await new_notification.save()
            res.send("new notification");
        }else{
            res.status(400).json({message: "No permission!"})
        }
        
    }catch(err){
        // console.log(err)
        res.status(400).json({message: err})
    }
})

router.post("/deletenotification", async(req, res)=>{
    try{
        const {id, userid} = req.body;

        const user = await User.findOne({_id: userid})
        if(user.status === "ADMIN"){
            await Notification.findOneAndDelete({_id: id});
            res.send("deleted")
        }else{
            res.status(400).json({message: "No permission!"})
        }
    }catch(err){
        res.status(400).json({message: err})
    }
})

module.exports = router;