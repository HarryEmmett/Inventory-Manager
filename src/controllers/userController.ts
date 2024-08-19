import { NextFunction, Request, Response } from "express";
import { pool } from "../db/pool";
import {
  getAllUsersQuery,
  getSpecificUserQuery,
  insertUserQuery,
  deleteUserQuery,
} from "../db/queries";
import CustomError from "../Errors/CustomError";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rows } = await pool.query(getAllUsersQuery);

    if (!rows.length) {
      const err = new CustomError("No users found!", 500);
      return next(err);
    }

    const users = rows.map(({ u_username }) => u_username);

    return res.status(200).render("allUsers", {
      title: "All Users",
      users,
    });
  } catch (e) {
    const err = new CustomError((e as Error).message, 500);
    return next(err);
  }
};

export const createUserForm = (req: Request, res: Response) => {
  return res.status(200).render("createUser", {
    title: "Create User Form",
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const text = req.body.name;

    const { rows } = await pool.query(getSpecificUserQuery, [text]);

    if (rows.length) {
      const err = new CustomError("User already exists!", 500);
      return next(err);
    }

    await pool.query(insertUserQuery, [text]);
    res.redirect(`/user/${text}`);
  } catch (e) {
    const err = new CustomError((e as Error).message, 500);
    return next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rows } = await pool.query(getSpecificUserQuery, [req.params.id]);

    if (!rows.length) {
      const err = new CustomError("No users found!", 500);
      return next(err);
    }

    return res.status(200).render("user", {
      title: "Get Specific User",
      user: rows[0].u_username,
    });
  } catch (e) {
    const err = new CustomError((e as Error).message, 500);
    return next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await pool.query(deleteUserQuery, [req.params.id]);
    res.sendStatus(200);
  } catch (e) {
    const err = new CustomError((e as Error).message, 500);
    return next(err);
  }
};
