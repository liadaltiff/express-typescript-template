import User, { IUser } from "../../models/user.model";
import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt");

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    return await res.status(200).json({
      status: 200,
      message: "Get All Users",
      users,
    });
  } catch (error: any) {
    return await res.status(500).json({ status: 500, error: error.message });
  }
};

export const updateRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { stateUsers } = req.body;
    if (!stateUsers) {
      throw new Error("Users Info Is Missing");
    }
    const clientUsers = stateUsers as IUser[];
    const dbUsers = await User.find();

    const arr = [...dbUsers, ...clientUsers];
    const map = new Map();

    for (const user of arr) {
      map.set(user._id, user);
    }

    clientUsers.forEach(async (user) => {
      await User.findOneAndUpdate(
        { _id: user._id },
        { role: user.role },
        { upsert: true, useFindAndModify: false }
      ).exec();
    });

    const newDBUsers = await User.find();

    return res.status(200).json({
      newDBUsers,
    });
  } catch (error: any) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

export const getAllByRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role: role }).exec();

    return res.status(200).json({
      status: 200,
      message: `Get All ${role}`,
      users,
    });
  } catch (error: any) {
    return res.status(500).json({ status: 500, error: error.message });
  }
};

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const userById = await User.findById(userId).lean();

    const reply = {
      userById,
      error: null,
      status: userById ? 200 : 404,
      user: userById
        ? `found user with id: ${userId}`
        : `user with id: ${userId} is not found`,
    };

    return await res.status(reply.status).json(reply);
  } catch (error: any) {
    return await res.status(500).json({ status: 500, error: error.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!(fullName && email && password)) {
      throw new Error("User Info Is Missing");
    }
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      role: "Viewer",
    });

    const foundUser = await User.findOne({ email: newUser.email });

    try {
      if (foundUser === null) {
        const savedUser = await newUser.save();
        res.status(201).json(newUser);
      } else {
        res.status(409).send("This Account Already Exist");
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const LoggedUser = await User.findOne({
      email: email,
    });

    if (LoggedUser) {
      if (await bcrypt.compare(password, LoggedUser.password)) {
        const reply = {
          error: null,
          status: LoggedUser ? 200 : 404,
          user: LoggedUser,
        };
        return await res.status(reply.status).json(reply);
      } else {
        res.status(401).send("Username Or Password Are Incorrect");
      }
    }
  } catch (error: any) {
    return await res.status(500).json({ status: 500, error: error.message });
  }
};
