import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const SignUpController = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res
      .status(201)
      .json({ message: `User ${username} has been created Successfully` });
  } catch (error) {
    next(error);
  }
};

export const SignInController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "Invalid Credentials"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {
      password: hashedPassword,
      createdAt,
      _id,
      __v,
      ...userDetails
    } = validUser._doc;
    const validity = new Date(Date.now() + 604800000); // One week.

    res
      .cookie("access_token", token, { httpOnly: true, expires: validity })
      .status(200)
      .json(userDetails);
  } catch (error) {
    next(error);
  }
};

export const googleController = async (req, res, next) => {
  try {
    const validUser = await User.findOne({ email: req.body.email });

    if (validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const {
        password: hashedPassword,
        createdAt,
        _id,
        __v,
        ...userDetails
      } = validUser._doc;
      const validity = new Date(Date.now() + 604800000); // One week.
      res
        .cookie("access-token", token, { httpOnly: true, expires: validity })
        .status(200)
        .json(userDetails);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPasswordGoogle, ...userDetails } = newUser._doc;
      const validity = new Date(Date.now() + 604800000);
      res
        .cookie("access-token", token, { httpOnly: true, expires: validity })
        .status(200)
        .json(userDetails);
    }
  } catch (error) {
    next(error);
  }
};
