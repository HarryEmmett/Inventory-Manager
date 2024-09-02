import { Router } from "express";
import {
  homePage,
  deletePokemon,
  addPokemon,
} from "../controllers/indexController";

const indexRouter = Router();

indexRouter.get("/", homePage);
indexRouter.post("/delete/:id", deletePokemon);
indexRouter.post("/add/:id/:type/:userId", addPokemon);

export default indexRouter;
