const express = require("express");
const app = express();
const morgan = require("morgan");
// kêt nối database
const dotenv = require("dotenv");
app.use(morgan("combined"));
dotenv.config();
// kết nối mogodb
//lets require/import the mongodb native drivers.
const mongoose = require("mongoose");
mongoose
  .connect(process.env.URL_MONGDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Kết nối thành công");
  })
  .catch((error) => {
    console.error("Kết nối thất bại: ", error);
  });
const routerUser = require("./router/userRouter");
app.use("/user", routerUser);
app.use("/led", routerUser);
app.use("/parkbooking", routerUser);

app.listen(3000);
