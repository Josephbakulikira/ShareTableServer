const router = require("express").Router();
const Patrimoine = require("../models/patrimoine.js");
const User = require("../models/user.js");

router.post("/get-all-files", async (req, res) => {
  try {
    const { userid } = req.body;
    const user = await User.findOne({ _id: userid });
    if (user) {
      if (user.status.toUpperCase() === "ADMIN") {
        const files = await Patrimoine.find();
        res.send(files);
      } else {
        res.status(400).json({ message: "no Permission" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/get-file", async (req, res) => {
  try {
    const { userid, fileid } = req.body;
    const user = await User.findOne({ _id: userid });
    if (user) {
      if (user.status.toUpperCase() === "ADMIN") {
        const file = await Patrimoine.findOne({ _id: fileid });
        res.send(file);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/delete-all", async (req, res) => {
  try {
    const { userid } = req.body;
    const user = await User.findOne({ _id: userid });
    if (user) {
      if (user.status.toUpperCase() === "ADMIN") {
        await Patrimoine.remove({});
        res.send("deleted");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/delete-file", async (req, res) => {
  try {
    const { userid, fileid } = req.body;
    const user = await User.findOne({ _id: userid });
    if (user) {
      if (user.status.toUpperCase() === "ADMIN") {
        await Patrimoine.findOneAndDelete({ _id: fileid });
        res.send("deleted");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/add-file", async (req, res) => {
  try {
    const {
        localisation,
        localdepart,
        description,
        dimensions,
        etat,
        quantity,
        codebare,
        userid,
        niveau,
        expirationdate
    } = req.body;
    const user = await User.findOne({ _id: userid });
    // console.log("here")
    if (user) {
        if (user.status.toUpperCase() === "ADMIN") {
            const new_patrimoine = new Patrimoine({
                localisation,
                localdepart,
                description,
                dimensions,
                etat,
                quantity,
                codebare,
                userid,
                niveau,
                expirationdate
              });
              // console.log(new_file)
              await new_patrimoine.save();
              res.send(new_patrimoine);
        }else{
            
            res.status(400).json({message: "Vous n'avez de permission pour soumettre cette fiche"})
        }
      
    }
  } catch (error) {
    //   console.log(error)
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
