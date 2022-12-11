const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000

// CONNECT MONGODB ATLAS

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=> {
    if(err){
        return console.error(err)
    }
    console.log("CONNECTED TO MONGODB DATABASE")
})

app.get("/", (req, res)=>{
    res.send("Chris management backend")
})

app.listen(PORT, ()=> {
    console.log("Server is running on port ---> " + PORT);

})

app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/rooms", require("./routes/roomRoutes.js"));
app.use("/api/projects", require("./routes/projectRoutes.js"));
app.use("/api/notifications", require("./routes/notificationRoutes.js"));
app.use("/api/files", require("./routes/ficheRoutes.js"));
app.use("/api/patrimoines", require("./routes/patrimoineRoutes.js"));
