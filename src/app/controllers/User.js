const UserSchema = require("../schemas/User");
const TestSchema = require("../schemas/Test");

class UserController {
  async create(req, res) {
    const { body } = req;
    try {
      const user = await UserSchema.create(body);
      return res.json(user);
    } catch (e) {
      return res.status(400).json("Bad request");
    }
  }
  async update(req, res) {
    const { body } = req;
    const { id: _id } = req.params;
    try {
      const user = await UserSchema.findByIdAndUpdate(_id, body);
      return res.json(user);
    } catch (e) {
      return res.status(404).json("User not found");
    }
  }
  async delete(req, res) {
    const { id: _id } = req.params;
    try {
      const tests = await TestSchema.deleteMany({ user: _id });
      const user = await UserSchema.findByIdAndDelete(_id);
      return res.json(user);
    } catch (e) {
      return res.status(404).json("User not found");
    }
  }
}

module.exports = new UserController();
