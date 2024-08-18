// @ts-ignore
import engine from "ejs-mate";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import path from "path";
import express from "express";
import indexRouter from "./routes/indexRouter";

const app = express();

app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

// catch 404 errors and redirect to middleware
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(500).json({
    error: "something went wrong",
  });
  next();
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`My first Express app - listening on port ${PORT}!`)
);
