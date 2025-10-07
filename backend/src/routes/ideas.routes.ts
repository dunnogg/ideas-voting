import { Router } from "express";
import { IdeasController } from "../controllers/ideas.controller";

const ideasRouter = Router();

ideasRouter.get("/", IdeasController.getIdeas);
ideasRouter.post("/vote", IdeasController.vote);

export default ideasRouter;
