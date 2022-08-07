const express = require("express");

const router = express.Router();

router.get("/", async (req, res)=>{
    res.json("Api is working!!!!!!!");
});
router.get("/check", async (req, res)=>{
    res.json("Api is working");
});

module.exports = router;
