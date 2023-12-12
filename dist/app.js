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
const express_1 = __importDefault(require("express"));
const init_1 = __importDefault(require("./model/init"));
const cors_1 = __importDefault(require("cors"));
const v1_1 = __importDefault(require("./routes/v1"));
const app = (0, express_1.default)();
app.set("port", process.env.PORT || 3000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use("/api", v1_1.default);
app.patch("/api/sync", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sync = yield (0, init_1.default)();
        res.status(200).json(Object.assign(Object.assign({}, sync), { error: false }));
    }
    catch (err) {
        console.log("ERR", err);
        let msg = "Internal Server Error";
        if (err instanceof Error) {
            msg = err.message;
        }
        else if (err) {
            msg = err;
        }
        return res.status(400).json({ errorMsg: msg, error: true });
    }
}));
exports.default = app;
//# sourceMappingURL=app.js.map