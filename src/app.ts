// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import engine from "ejs-mate";
import { Request, Response, NextFunction } from "express";
import path from "path";
import express from "express";
import indexRouter from "./routes/indexRouter";
import userRouter from "./routes/userRouter";
import CustomError from "./Errors/CustomError";

const app = express();

app.use(express.static("public"));
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/user", userRouter);

// no matching route so throw not found error
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// setting up with all 4 parameters acts as an error catch, where you can pass next(err) to hit the middleware
// an alternative would be to try catch in the controller and res.sendStatus(500)
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
  next();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}!`));
