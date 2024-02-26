import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const generateToken = (data) => {
  const token = jwt.sign({ data }, secret, { expiresIn: "2d" });
  return token;
};

export const decodeToken = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

export const verifyToken = (token) => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
};
