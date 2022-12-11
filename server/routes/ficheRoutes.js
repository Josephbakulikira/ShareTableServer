const router = require("express").Router();
const Fiche = require("../models/fiche.js");
const User = require("../models/user.js");

router.post("/get-all-files", async (req, res) => {
  try {
    const { userid } = req.body;
    const user = await User.findOne({ _id: userid });
    if (user) {
      if (user.status.toUpperCase() === "ADMIN") {
        const files = await Fiche.find();
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
        const file = await Fiche.findOne({ _id: fileid });
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
        await Fiche.remove({});
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
        await Fiche.findOneAndDelete({ _id: fileid });
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
      userid,
      description,
      office,
      solution,
      observation,
      amount,
      division,
      name,
    } = req.body;
    const user = await User.findOne({ _id: userid });
    // console.log("here")
    if (user) {
      const new_file = new Fiche({
        description,
        office,
        solution,
        observation,
        amount,
        division,
        name,
        userid
      });
      // console.log(new_file)
      await new_file.save();
      res.send(new_file);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
