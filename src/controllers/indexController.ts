import { Request, Response } from "express";
import { pool } from "../db/pool";

export const homePage = async (req: Request, res: Response) => {
  // get a pokemon (remove nickname)
  // const { rows: getCharmanderAndType } = await pool.query(
  //   `SELECT p.p_pokemon_id, p.p_pokemon_name, p.p_picture, t.t_type_name
  //   FROM pokemon p
  //   JOIN types t ON p.p_type_id = t.t_type_id
  //   WHERE p.p_pokemon_name = $1 LIMIT 1`,
  //   ["Charmander"]
  // );

  // console.log(getCharmanderAndType, 1);

  // all users that own a pokemon with id 1
  // const { rows: allCharmanders } = await pool.query(
  //   `SELECT u.u_username, u.u_id, up.up_pokemon_id, up.up_nickname, p_pokemon_name
  //   FROM users u
  //   JOIN userhaspokemon up ON u.u_id = up.up_user_id
  //   JOIN pokemon p ON p.p_pokemon_id = up.up_pokemon_id
  //   WHERE up.up_pokemon_id = 1`
  // );

  // console.log(allCharmanders);

  // All pokemon a user owns
  const { rows: allFromUser } = await pool.query(
    `SELECT u.u_username, p.p_pokemon_name, p.p_picture, up.up_nickname, up.up_pokemon_lvl, t.t_type_name
    FROM users u
    JOIN userhaspokemon up ON u.u_id = up.up_user_id
    JOIN pokemon p ON p.p_pokemon_id = up.up_pokemon_id
    JOIN types t ON up_type_id = t.t_type_id
    WHERE up.up_user_id = 1`
  );

  const { rows: allPokemon } = await pool.query("SELECT * FROM pokemon");

  const p = allPokemon.map(({ p_pokemon_id, p_pokemon_name }) => ({
    id: p_pokemon_id,
    name: p_pokemon_name,
  }));

  console.log(p);
  return res.render("index", {
    title: "Home Page",
    data: allFromUser,
    pokemon: p,
    user: req.user,
  });
};
