let express = require("express");
let router = express.Router();
let UserController = require('../controllers/user.controller');
let authMiddleware = require('../middlewares/auth.middleware')
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);








module.exports = router;
