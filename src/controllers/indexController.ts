import { Request, Response } from "express";
import { pool } from "../db/pool";

export const homePage = async (req: Request, res: Response) => {
  // const { rows: getCharmanderAndType } = await pool.query(
  //   "SELECT p.pokemon_id, p.name, p.picture, pt.type_name FROM pokemon p JOIN pokemontypes pt ON p.type_id = pt.type_id WHERE p.name = $1 LIMIT 1",
  //   ["Charmander"]
  // );

  // const { rows: allCharmanders } = await pool.query(
  //   "SELECT u.username, u.id, up.pokemon_id, up.nickname FROM usernames u JOIN userhaspokemon up ON u.id = up.user_id WHERE up.pokemon_id = 1"
  // );

  const { rows: allFromUser } = await pool.query(
    `SELECT u.id, up.user_id, up.pokemon_id, up.nickname, p.type_id, p.name, pt.type_name, p.picture
    FROM usernames u
    JOIN userhaspokemon up ON u.id = up.user_id
    JOIN pokemon p ON p.pokemon_id = up.pokemon_id
    JOIN pokemontypes pt ON p.type_id = pt.type_id
    WHERE up.user_id = 13`
  );

  // const { rows: v } = await pool.query("SELECT * FROM userhaspokemon");

  console.log(allFromUser);
  return res.status(200).render("index", {
    title: "Home Page",
    data: allFromUser,
  });
};
