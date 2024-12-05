import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateJWTKey = (name, email) => {
  const payload = {
    name,
    email,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY);
  console.log("token : ", token);
  return token;
};
