const { User } = require("../models/UserModel");

class userController {
  login(req, res) {
    const { gmail, password } = req.body;

    // Search for user in the database
    User.findOne({gmail, password })
      .exec()
      .then((user) => {
        if (!user) {
          // User not found
          return res
            .status(404)
            .json({ message: "Tên người dùng hoặc mật khẩu không chính xác" });
        }
        // User found, login successful
        res.status(200).json({
          message: "Đăng nhập thành công",
          data: {
            user :user
          },
        });
      })
      .catch((err) => {
        console.error("Error searching for user:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  }
  show(req, res) {
    res.send("Thành công ");
  }
  get(req, res) {

  }

  create(req, res) {

  }

  delete(req, res) {

  }

  edit(req, res) {

  }

  update(req, res) {

  }
}
module.exports = new userController();
