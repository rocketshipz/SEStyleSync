// server/utils/generateToken.js
import jwt from 'jsonwebtoken'; // Changed from require

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Or whatever expiry you prefer
  });
};

export default generateToken; // Changed from module.exports