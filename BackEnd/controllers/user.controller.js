import User from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(301).json("USER ALREADY EXISTS");
    }


    if (password.length < 6) {
      return res.status(400).json("PASSWORD SHOULD HAVE A MINIMUM LENGTH OF 6");
    }


    const hashedPassword = bcryptjs.hashSync(password, 10);


    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      message: "USER CREATED SUCCESSFULLY",
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "NO SUCH USER EXISTS" });
    }

    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "INVALID PASSWORD" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

    return res.status(200).json({
      token,
      message: "LOGGED IN SUCCESSFULLY",
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const authenticate = async (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

}
