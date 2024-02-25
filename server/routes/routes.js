const Users = require("../controllers/user.controllers");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/register", Users.createUser);
  app.post("/api/login", Users.loginUsers);
  app.get("/api/users", Users.getAllUsers);
  app.post("/api/logout", Users.logoutUser);
  //
  app.delete("/api/deleteUser/:id", Users.deleteUser);
  app.put("/api/updateUser/:id", Users.UpdateUser);
  app.get("/api/getOneUser/:id", Users.getOneUser);
};
