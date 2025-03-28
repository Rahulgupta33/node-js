//Importing library
const { User_Schema } = require("../collection");
const jwt = require("jsonwebtoken");
const {jwtKey} = require("../config");

const isAuthenticated = async (request, response, next) => {
  const token  = request?.headers?.authorization;
  try {
    if (!token) {
      return response.status(401).send({
        success: false,
        message: "user is not login or not authenticated",
      });
    } else {
      const decode = jwt.verify(token, jwtKey);
      request.user = await User_Schema.findOne({ _id: decode?._id });
      next();
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      message: error?.message,
    });
  }
};

module.exports = { isAuthenticated };