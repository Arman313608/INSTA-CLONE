const express = require("express");
const cookieParser = require("cookie-parser");
const authControllers = require("../controllers/auth.controllers")


const authRouter = express.Router()



/**
 * POST /api/auth/register
 */

authRouter.post("/register", authControllers.registerControllers)

/**
 * POST /api/auth/login
 */
authRouter.post("/login", authControllers.loginControllers)












module.exports = authRouter;


