import { Router } from "express";
import * as loginControllers from "../controllers/login.controller.js"
import { authenticateToken } from "../Middleware/auth.js";
const loginRouter = Router();

loginRouter.get("/getUser",authenticateToken, loginControllers.getLogin);//(ok)
loginRouter.post("/login", loginControllers.loginUser);//(ok)
loginRouter.post('/create',authenticateToken, loginControllers.createUser);//(ok)
loginRouter.delete('/delete/:id',authenticateToken, loginControllers.deleteUser);//(ok)
loginRouter.put("/update/:id",authenticateToken, loginControllers.updateUser);

export default loginRouter;