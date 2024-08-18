import { Router } from "express";
import { homePage } from "../controllers/indexController";

const indexRouter = Router();

indexRouter.get("/", homePage);

export default indexRouter;
