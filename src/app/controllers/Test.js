const TestSchema = require("../schemas/Test");
const UserSchema = require("../schemas/User");
class TestController {
  async create(req, res) {
    const { body } = req;
    const { code } = body;
    const user = await UserSchema.findOne({ code });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const { _id: userId } = user;
    const test = await TestSchema.create({ ...body, user: userId });
    return res.json(test);
  }

  async list(req, res) {
    const tests = await TestSchema.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name");
    return res.json(tests);
  }
}

module.exports = new TestController();
