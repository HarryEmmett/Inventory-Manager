import { NextFunction, Request, Response } from "express";
import { signUpQuery } from "../db/queries";
import { pool } from "../db/pool";
import passport from "passport";

export const signUpForm = async (req: Request, res: Response) => {
  res.render("signUpForm");
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await pool.query(signUpQuery, [req.body.username, req.body.password]);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
