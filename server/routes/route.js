const express = require("express")
const router = express.Router()

const {createUser,addUserDetails,LogIn,validation,deleteUser,fetchAllUser} = require("../controller/createUser")

router.post("/createuser",createUser)
router.post("/updateprofile",addUserDetails)
router.post("/login",LogIn)
router.post("/verification",validation) 
router.post("/deleteuser",deleteUser)
router.get("/fetchalluser",fetchAllUser)

module.exports = router;