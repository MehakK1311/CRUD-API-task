const express = require("express");
const {createUser, authUser, updateUser, getUsers, getSingleUser, deleteUser} = require("../controllers/userControllers")

const router = express.Router();

router.post('/',createUser);
// router.post('/login',authUser);
router.get('/details',getUsers);
router.put('/update/:id',updateUser);
router.get('/:id',getSingleUser);
router.delete('/delete/:id',deleteUser);

module.exports = router;