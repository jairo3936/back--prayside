import { Router } from "express";


import { methods as PublicationController } from "../controllers/publicaciones.controler";

const router = Router();

// Rutas para publicaciones
router.get("/", PublicationController.getPublication);
router.post("/addpublication", PublicationController.addPublication);
router.delete("/deletepublicaciones/:id", PublicationController.deletePublicacion);


export default router;
