"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const authRouter = (0, express_1.Router)();
authRouter.post("/register-user", auth_1.registerUser);
authRouter.post("/register-admin", auth_1.registerAdmin);
authRouter.put("/verify-user", auth_1.verifyUser);
authRouter.put("/verify-admin", auth_1.verifyAdmin);
authRouter.post("/login-user", auth_1.loginUser);
authRouter.post("/login-admin", auth_1.loginAdmin);
exports.default = authRouter;
//# sourceMappingURL=authRoute.js.map