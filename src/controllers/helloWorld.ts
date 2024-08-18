// import { Request, Response } from "express";
import { pool } from "../db/pool";

export const helloWorld = async () => {
  // res.render("index", {
  //   title: "Hello World",
  //   hello: "hello world!",
  // });

  try {
    const { rows } = await pool.query("SELECT * FROM usernames");
    // return rows;
    console.log(rows, "rows");
  } catch (e) {
    console.log(e as Error, "message");
  }
};
