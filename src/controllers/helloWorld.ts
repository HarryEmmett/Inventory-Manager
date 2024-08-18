import { Request, Response } from "express";

export const helloWorld = (req: Request, res: Response) => {
  res.render("index", {
    title: "Hello World",
    hello: "hello world!",
  });
};
