import { omit } from "lodash";
import { createUser, findOneUser, userExists, validatePassword } from "../services/userService";
import { Request, Response } from "express";
import User from "../model/models/User";

const omitData = ["password"];
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

function generateToken(email: any) {
  return jwt.sign({ email }, 'secret_key', { expiresIn: '1h' });
}

const mailOptions = (token: string, email: string, role: string) => {
  return {
    from: 'Techerduite Harshvardhan Verification',
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: http://localhost:5000/api/auth/verify-${role}?token=${token}`,
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'bill181297@gmail.com',
    pass: "sxir ruhh vqfw vpbb"
  }
});

export const registerUser = async (req: Request, res: Response) => {
  try {
    let user = req.body;
    const userExist = await userExists({ email: user.email });

    if (userExist) {
      throw new Error("Email is alredy used");
    }

    if (req.path == "/register-admin") {
      user.role = 1;
    }
    user = await createUser(user);
    const userData = omit(user?.toJSON(), omitData);

    const token = generateToken(user.email);

    await transporter.sendMail(mailOptions(token, user.email, req.path == "/register-admin" ? "admin" : "user"));

    return res.status(200).json({
      data: userData,
      error: false,
      msg: `${req.path == "/register-user" ? "User" : "Admin"} registered successfully. Check your email for account verification.`,
    });
  } catch (err) {
    let msg = "Internal Server Error";
    if (err instanceof Error) {
      msg = err.message;
    } else if (err) {
      msg = err;
    }
    return res.status(400).json({ errorMsg: msg, error: true });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findOneUser({ email });
    if (!user) {
      throw new Error("Email id is incorrect");
    }

    const validPassword = await validatePassword(user.email, password);
    if (!validPassword) {
      throw new Error("Password is incorrect");
    }
    const userData: any = omit(user?.toJSON(), omitData);

    if (!userData.isMailVerified) {
      throw new Error("You need to verify your email to login");
    }

    if (userData.role === 2 && req.path == "/login-admin") {
      throw new Error("You are not allowed to login from here");
    }

    return res.status(200).json({
      data: userData,
      error: false,
      msg: `${req.path == "/login-admin" ? "Admin" : "User"} logged in successfully`
    });
  } catch (err) {
    let msg = "Internal Server Error";
    if (err instanceof Error) {
      msg = err.message;
    } else if (err) {
      msg = err;
    }
    return res.status(400).json({ errorMsg: msg, error: true });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  jwt.verify(token, 'secret_key', async (err: any, decoded: any) => {
    if (err) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const { email } = decoded;

    try {
      const [rowsAffected] = await User.update({ isMailVerified: true }, { where: { email } });

      if (rowsAffected === 0) {
        return res.status(404).json({ error: `${req.path == "/verify-admin" ? "Admin" : "User"} not found` });
      }

      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ error: 'Failed to verify email' });
    }
  });
};