const { log } = require('console');
const { User_Schema, passwordStore_Schema } = require('../collection');
const crypto = require('crypto');

const SECRET_KEY = "mysecretkey"; // original secret key

// Generate a 32-byte key using SHA-256
const key = crypto.createHash('sha256').update(SECRET_KEY).digest();

// Function to encrypt password
const encryptPassword = (password) => {
  const iv = crypto.randomBytes(16); // Initialization vector (IV) is necessary for AES encryption
  const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted; // Return IV and encrypted text
};

// Function to decrypt password
const decryptPassword = (encryptedPassword) => {
  const [ivHex, encrypted] = encryptedPassword.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const createPasswordStore = async (req, response) => {
  const { password, title, email, description, folderId } = req.body;

  let userId = req.user._id;

  const encryptedPassword = encryptPassword(password);

  const passwordStore = new passwordStore_Schema({ userId, password: encryptedPassword, title, email, description, folderId });
  await passwordStore.save();

  return response.status(200).send({
    success: true,
    message: "Password stored successfully"
  });
}

const getPassword = async (req, response) => {
  const passwordStore = decryptPassword(req.headers.password);
  return response.status(200).send({
    success: true,
    result: passwordStore
  });
}

const getMyPasswords = async (req, res) => {
  try {
    const userId = req?.user?._id;

    let allPost = await passwordStore_Schema.find()


    let myPost = allPost.filter(
      (item) => item?.userId?.toString() == userId?.toString()
    );

    console.log(myPost);


    if (myPost.length > 0) {
      return res.status(200).send({
        success: true,
        result: myPost,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "No Password saved",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message,
    });
  }
}

const geyMyPasswordFolder = async (req, res) => {
  try {
    const userId = req?.user?._id;
    const folderId = req.headers.folderid;


    console.log(folderId);
    

    let allPassword = await passwordStore_Schema.find({ folderId: folderId })

    let myFolderPassword = allPassword.filter(
      (item) => item?.userId?.toString() == userId?.toString()
    );

    console.log(myFolderPassword);


    if (myFolderPassword.length > 0) {
      return res.status(200).send({
        success: true,
        result: myFolderPassword,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "No Password saved",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message,
    });
  }
}


module.exports = {
  createPasswordStore,
  getPassword,
  getMyPasswords,
  geyMyPasswordFolder
};