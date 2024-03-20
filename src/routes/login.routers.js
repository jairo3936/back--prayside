import { Router } from "express";


import { methods as loginControler } from "../controllers/login.controler";

const router = Router();

// Rutas para publicaciones
router.post("/loguear", loginControler.loginUser);//(ok)
router.get('/', loginControler.getLogin);//(ok)
router.post('/create', loginControler.createUser);//(ok)
router.delete('/delete', loginControler.deleteUser);//(pendiente)



export default router;
