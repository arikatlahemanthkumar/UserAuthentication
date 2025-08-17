import express from "express"
import userCtrl from "../controllers/userCtrl.js"

import { checkSchema } from "express-validator"
import { userRegisterSchema ,userLoginSchema } from "../validators/userValidations.js"
import authenticateUser from "../middleware/authenticate.js"

const router = express.Router()

// Authentication routes as per requirements
router.post('/auth/register',checkSchema(userRegisterSchema),userCtrl.register) // POST /api/auth/register
router.post('/auth/login',checkSchema(userLoginSchema),userCtrl.login) // POST /api/auth/login
router.get('/protected',authenticateUser,userCtrl.protected) // GET /api/protected - requires JWT

export default router