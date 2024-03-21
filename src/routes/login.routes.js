import { Router } from "express";
import * as loginControllers from "../controllers/login.controller.js"

const loginRouter = Router();

loginRouter.get("/getUser", loginControllers.getLogin);//(ok)
loginRouter.post("/login", loginControllers.loginUser);//(ok)
loginRouter.post('/create', loginControllers.createUser);//(ok)
loginRouter.delete('/delete/:id', loginControllers.deleteUser);//(ok)
loginRouter.put("/update/:id", loginControllers.updateUser);

export default loginRouter;