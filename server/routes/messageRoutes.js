const express=require("express");
const { addMessage, getAllMessages } = require("../controllers/messageController");
const auth =require("../middleware/auth")

const router=express.Router();


router.post("/add",auth,addMessage);
router.post("/all",auth,getAllMessages);

module.exports=router;

