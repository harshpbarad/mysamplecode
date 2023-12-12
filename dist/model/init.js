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
exports.modelList = void 0;
const connection_1 = __importDefault(require("./connection"));
const User_1 = __importDefault(require("./models/User"));
const isDev = process.env.NODE_ENV === "development";
exports.modelList = {
    User: User_1.default,
};
const dbInit = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.sync({ alter: isDev });
        return { success: true };
    }
    catch (error) {
        throw error;
    }
});
exports.default = dbInit;
//# sourceMappingURL=init.js.map