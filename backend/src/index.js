const express = require("express");
const cors = require("cors");
const UserRoute = require("../routes/user_route");

const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(express.json());
app.use(cors());

app.use("/api", UserRoute);



const server = app.listen(4000, () =>
  console.log(`
Server ready at: http://localhost:4000`)
);

