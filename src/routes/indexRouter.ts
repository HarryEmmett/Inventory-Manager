import { Router } from "express";
import { helloWorld } from "../controllers/helloWorld";

const indexRouter = Router();

indexRouter.get("/", helloWorld);

export default indexRouter;
