const Sequelize = require("sequelize");

const sequelize = new Sequelize("specs-capstone", "root", "toor", {
  //   host: "localhost",
  //   port: 5000,
  dialect: "mysql",
});

const Users = sequelize.define("users", {
  firebaseId: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
});

Users.sync()
  .then(() => {
    const user = Users.build({ firebaseId: "test" });
    console.log("TABLE ADDED/SYNCED: ", user.firebaseId);
    return user.save();
  })
  .then((data) => {
    console.log("User added");
  })
  .catch((err) => {
    console.log(err);
  });

//& Just checks if the server connects successfully
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("connection successful");
//   })
//   .catch((err) => {
//     console.log("error connecting to database");
//   });
