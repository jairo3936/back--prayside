import { Router } from "express";
import * as publicationControllers from "../controllers/publications.controllers.js"

const publicationRouter = Router();

publicationRouter.get("/publications", publicationControllers.getPublication);
publicationRouter.post("/addpublication", publicationControllers.addPublication);
publicationRouter.delete("/deletepublicaciones/:id", publicationControllers.deletePublication);

export default publicationRouter;