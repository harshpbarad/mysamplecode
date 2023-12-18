"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const authRouter = (0, express_1.Router)();
authRouter.post("/register-user", auth_1.registerUser);
authRouter.post("/register-admin", auth_1.registerUser);
authRouter.get("/verify-user", auth_1.verifyUser);
authRouter.get("/verify-admin", auth_1.verifyUser);
authRouter.post("/login-user", auth_1.loginUser);
authRouter.post("/login-admin", auth_1.loginUser);
exports.default = authRouter;
//# sourceMappingURL=authRoute.js.map