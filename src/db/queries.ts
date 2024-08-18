export const getAllUsersQuery = "SELECT * FROM usernames";
export const getSpecificUserQuery =
  "SELECT * FROM usernames WHERE username = $1 LIMIT 1";
export const insertUserQuery = "INSERT INTO usernames (username) VALUES ($1)";
export const deleteUserQuery = "DELETE FROM usernames WHERE username = $1";
