export const getAllUsersQuery = "SELECT * FROM users";
export const getSpecificUserQuery =
  "SELECT * FROM users WHERE u_username = $1 LIMIT 1";
export const insertUserQuery = "INSERT INTO users (u_username) VALUES ($1)";
export const deleteUserQuery = "DELETE FROM users WHERE u_username = $1";
export const signUpQuery =
  "INSERT INTO users (u_username, u_password) VALUES ($1, $2)";
