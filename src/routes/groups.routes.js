import { Router } from "express";
import * as groupControllers from "../controllers/groups.controller.js";

const groupsRoutes = Router();

groupsRoutes.get("/groups", groupControllers.getMinisterios);
groupsRoutes.post("/addMinisterios", groupControllers.addMinisterios)
groupsRoutes.delete("/deleteministerios/:id", groupControllers.deleteMinisterios)
groupsRoutes.put("/updateministerio/:id", groupControllers.updateMinisterio)

export default groupsRoutes;