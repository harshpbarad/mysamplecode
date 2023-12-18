"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.loginUser = exports.registerUser = void 0;
const lodash_1 = require("lodash");
const userService_1 = require("../services/userService");
const User_1 = __importDefault(require("../model/models/User"));
const omitData = ["password"];
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
function generateToken(email) {
    return jwt.sign({ email }, 'secret_key', { expiresIn: '1h' });
}
const mailOptions = (token, email, role) => {
    return {
        from: 'Techerduite Harshvardhan Verification',
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: http://localhost:5000/api/auth/verify-${role}?token=${token}`,
    };
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
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.body;
        const userExist = yield (0, userService_1.userExists)({ email: user.email });
        if (userExist) {
            throw new Error("Email is alredy used");
        }
        if (req.path == "/register-admin") {
            user.role = 1;
        }
        user = yield (0, userService_1.createUser)(user);
        const userData = (0, lodash_1.omit)(user === null || user === void 0 ? void 0 : user.toJSON(), omitData);
        const token = generateToken(user.email);
        yield transporter.sendMail(mailOptions(token, user.email, req.path == "/register-admin" ? "admin" : "user"));
        return res.status(200).json({
            data: userData,
            error: false,
            msg: `${req.path == "/register-user" ? "User" : "Admin"} registered successfully. Check your email for account verification.`,
        });
    }
    catch (err) {
        let msg = "Internal Server Error";
        if (err instanceof Error) {
            msg = err.message;
        }
        else if (err) {
            msg = err;
        }
        return res.status(400).json({ errorMsg: msg, error: true });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (0, userService_1.findOneUser)({ email });
        if (!user) {
            throw new Error("Email id is incorrect");
        }
        const validPassword = yield (0, userService_1.validatePassword)(user.email, password);
        if (!validPassword) {
            throw new Error("Password is incorrect");
        }
        const userData = (0, lodash_1.omit)(user === null || user === void 0 ? void 0 : user.toJSON(), omitData);
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
    }
    catch (err) {
        console.error(err);
        let msg = "Internal Server Error";
        if (err instanceof Error) {
            msg = err.message;
        }
        else if (err) {
            msg = err;
        }
        return res.status(400).json({ errorMsg: msg, error: true });
    }
});
exports.loginUser = loginUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    jwt.verify(token, 'secret_key', (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ error: 'Invalid token' });
        }
        const { email } = decoded;
        try {
            const [rowsAffected] = yield User_1.default.update({ isMailVerified: true }, { where: { email } });
            if (rowsAffected === 0) {
                return res.status(404).json({ error: `${req.path == "/verify-admin" ? "Admin" : "User"} not found` });
            }
            res.status(200).json({ message: 'Email verified successfully' });
        }
        catch (error) {
            console.error('Error verifying email:', error);
            res.status(500).json({ error: 'Failed to verify email' });
        }
    }));
});
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth.js.map