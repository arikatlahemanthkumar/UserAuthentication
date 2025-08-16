import express from "express"
import userCtrl from "../controllers/userCtrl.js"

import { checkSchema } from "express-validator"
import { userRegisterSchema ,userLoginSchema } from "../validators/userValidations.js"
import authenticateUser from "../middleware/authenticate.js"

const router = express.Router()

router.post('/auth/register',checkSchema(userRegisterSchema),userCtrl.register)
router.post('/auth/login',checkSchema(userLoginSchema),userCtrl.login)
router.get('/protected',authenticateUser,userCtrl.protected)

export default router 