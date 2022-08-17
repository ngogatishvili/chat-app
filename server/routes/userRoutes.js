const { registerUser, loginUser,setAvatar,getContacts, addContact, getAllUsers} = require('../controllers/userController');
const auth=require("../middleware/auth");
const router=require('express').Router();




router.post("/register",registerUser);
router.post("/login",loginUser);
router.put("/setAvatar",auth,setAvatar);
router.get("/contacts",auth,getContacts);
router.get("/allUsers",auth,getAllUsers);
router.put("/contacts/addContact/:contactId",auth,addContact);


module.exports=router;


