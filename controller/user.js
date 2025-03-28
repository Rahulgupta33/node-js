//Importing library
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwtKey} = require("../config");

//Importing controller
const { User_Schema } = require("../collection");

const securePassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const signupController = async (request, response) => {
  const { name, email, password } = request.body;

  let body = {
    name,
    email,
    password: await securePassword(password),
  };

  let authUser = await User_Schema.findOne({ email });

  try {
    if (authUser) {
      return response
        .status(400)
        .send({ success: false, message: "email already register" });
    } else {
      let signupUser = new User_Schema(body);
      let result = await signupUser.save();
      response.status(201).send({
        success: true,
        message: "Account successfully created",
        result,
      });
    }
  } catch (error) {
    response.status(500).send({ success: false, message: error?.message });
  }
};

const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    let authUser = await User_Schema.findOne({ email }).select("+password");
    let passwordMatch = await bcrypt.compare(password, authUser?.password);
    let token = jwt.sign({ _id: authUser?._id }, jwtKey);

    if (!authUser) {
      response.status(400).send({ success: false, message: "user not found" });
    } else {
      if (passwordMatch) {
        response.status(200).send({
          success: true,
          message: "login successfully",
          authUser,
          token,
        });
      } else {
        response
          .status(400)
          .send({ success: false, message: "Password is wrong" });
      }
    }
  } catch (error) {
    response.status(500).send({ success: false, message: error?.message });
  }
};

const getMyInfo = async (request, response) => {
  try {
    const email = request?.user?.email;
    let authUser = await User_Schema.findOne({ email });

    if (authUser) {
      return response.status(200).send({ success: true, result: authUser });
    } else {
      return response.status(400).send({
        success: false,
        message: "user not found or somethink is wrong please try again",
      });
    }
  } catch (error) {
    return response
      .status(500)
      .send({ success: false, message: error?.message });
  }
};

// const getUserById = async (request, response) => {
//   try {
//     const userId = request?.params?.id;
//     let authUser = await User_Schema.findOne({ _id: userId });
//     return response.status(200).send({ success: true, result: authUser });
//   } catch (error) {
//     return response
//       .status(500)
//       .send({ success: false, message: error?.message });
//   }
// };

// const getAllUser = async (request, response) => {
//   try {
//     let user = await User_Schema.find();
//     return response.status(200).send({ success: true, result: user });
//   } catch (error) {
//     return response
//       .status(500)
//       .send({ success: false, message: error?.message });
//   }
// };

// const logout = async (request, response) => {
//   try {
//     response
//       .status(200)
//       .send({ success: true, message: "User logout successfuly" });
//   } catch (error) {
//     return response
//       .status(500)
//       .send({ success: false, message: error?.message });
//   }
// };

module.exports = {
  signupController,
  loginController,
  getMyInfo
};