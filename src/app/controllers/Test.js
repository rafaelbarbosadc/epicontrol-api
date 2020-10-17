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
      .populate("user", "name")
      .limit(15);
    return res.json(tests);
  }

  async testsByResult(req, res) {
    const test = await TestSchema.aggregate([
      {
        $group: {
          _id: "$result",
          value: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          _id: false,
          value: true,
        },
      },
    ]);

    let formatted = test.map((result) => {
      return { ...result, name: result.name ? "Sucesso" : "Falha" };
    });

    formatted.sort(function (a, b) {
      if (a["name"] === "Sucesso") {
        return -1;
      } else {
        return 1;
      }
    });

    return res.json(formatted);
  }
}

module.exports = new TestController();
