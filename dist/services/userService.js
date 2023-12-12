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
exports.findOneUser = exports.validateAdmin = exports.validatePassword = exports.userExists = exports.createUser = void 0;
const User_1 = __importDefault(require("../model/models/User"));
const sequelize_1 = require("sequelize");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.create(payload);
    return user;
});
exports.createUser = createUser;
const userExists = (options = { email: null }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!options.email) {
        throw new Error("Please provide either of these options: email");
    }
    const where = {
        [sequelize_1.Op.or]: [],
    };
    if (options.email) {
        where[sequelize_1.Op.or].push({ email: options.email });
    }
    const users = yield User_1.default.findAll({ where: where });
    return users.length > 0;
});
exports.userExists = userExists;
const validatePassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email && !password) {
        throw new Error("Please provide email and password");
    }
    const where = {
        [sequelize_1.Op.or]: [],
    };
    if (email) {
        where[sequelize_1.Op.or].push({ email: email });
    }
    const user = yield User_1.default.findOne({ where });
    return User_1.default.validPassword(password, user.password);
});
exports.validatePassword = validatePassword;
const validateAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email && !password) {
        throw new Error("Please provide email and password");
    }
    const where = {
        [sequelize_1.Op.or]: [],
    };
    if (email) {
        where[sequelize_1.Op.or].push({ email: email });
    }
    const user = yield User_1.default.findOne({ where });
    return User_1.default.validPassword(password, user.password);
});
exports.validateAdmin = validateAdmin;
const findOneUser = (options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!options.email && !options.id) {
        throw new Error("Please provide email");
    }
    const where = {
        [sequelize_1.Op.or]: [],
    };
    if (options.email) {
        where[sequelize_1.Op.or].push({ email: options.email });
    }
    const user = yield User_1.default.findOne({ where, attributes: { exclude: ["password"] } });
    return user;
});
exports.findOneUser = findOneUser;
//# sourceMappingURL=userService.js.map