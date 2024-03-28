const users = require("../models/userModel");

const getAuthorization = async (req, res, next) => {
  try {
 
    if (!req.get("Authorization")) {
      const err = new Error("Not Authenticated!");
      res.status(401).set("www-Authenticate", "Basic");
      throw err;
    }

    const credentials = Buffer.from(
      req.get("Authorization").split(" ")[1],
      "base64"
    )
      .toString()
      .split(":");

    const username = credentials[0];
    const password = credentials[1];

    const user = await users.findOne({ where: { UserName: username } });

    if (process.env.NODE_ENV !== "test" && !user.isVerified) {
      return res.status(401).send("Your account is not verified");
    }
    const trialvalidpass = await user.validPassword(password);
    if (!trialvalidpass) {
      return res.status(401).send("Not Authenticated");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

module.exports = {
  getAuthorization,
};
