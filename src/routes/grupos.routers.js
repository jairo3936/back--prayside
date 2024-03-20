import { Router } from "express";
import { methods as gruposController } from "../controllers/grupos.controler";


const router = Router();

// Rutas para ministerios
router.get("/ministerio", gruposController.getMinisterios)
router.post("/addMinisterios", gruposController.addMinisterios)
router.delete("/deleteministerios/:id", gruposController.deleteMinisterios)
router.put("/updateministerio/:id", gruposController.updateMinisterio)


export default router;
