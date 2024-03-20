import { Router } from "express";
import * as loginControllers from "../controllers/login.controller.js"

const loginRouter = Router();

loginRouter.get("/getUser", loginControllers.getLogin);
loginRouter.post("/login", loginControllers.loginUser);//(ok)
loginRouter.post('/create', loginControllers.createUser);//(ok)
loginRouter.delete('/delete', loginControllers.deleteUser);//(pendiente)

export default loginRouter;