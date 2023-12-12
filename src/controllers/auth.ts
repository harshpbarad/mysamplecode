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
    user = await createUser(user);
    const userData = omit(user?.toJSON(), omitData);

    const token = generateToken(user.email);

    const mailOptions = {
      from: 'Techerduite Harshvardhan Verification',
      to: user.email,
      subject: 'Email Verification',
      text: `Click the following link to verify your email: http://localhost:5000/api/auth/verify-user?token=${token}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      data: userData,
      error: false,
      msg: "User registered successfully. Check your email for account verification.",
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

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    let admin = req.body;
    admin.role = 1

    const adminExist = await userExists({ email: admin.email });

    if (adminExist) {
      throw new Error("Email is alredy used");
    }
    admin = await createUser(admin);
    const adminData = omit(admin?.toJSON(), omitData);

    return res.status(200).json({
      data: adminData,
      error: false,
      msg: "Admin registered successfully",
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
    const userData = omit(user?.toJSON(), omitData);

    return res.status(200).json({
      data: userData,
      error: false,
      msg: "User logged in successfully"
    });
  } catch (err) {
    console.error(err);
    let msg = "Internal Server Error";
    if (err instanceof Error) {
      msg = err.message;
    } else if (err) {
      msg = err;
    }
    return res.status(400).json({ errorMsg: msg, error: true });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
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

    if (userData.role !== 1) {
      throw new Error("You are not allowed to login from here");
    }

    return res.status(200).json({
      data: userData,
      error: false,
      msg: "Admin logged in successfully"
    });
  } catch (err) {
    console.error(err);
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
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ error: 'Failed to verify email' });
    }
  });
};

export const verifyAdmin = async (req: Request, res: Response) => {
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
        return res.status(404).json({ error: 'Admin not found' });
      }

      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ error: 'Failed to verify email' });
    }
  });
};