import { Router } from "express";
import { loginUser, registerUser, verifyUser } from "../../controllers/auth";
const authRouter = Router();

authRouter.post("/register-user", registerUser);
authRouter.post("/register-admin", registerUser);
authRouter.get("/verify-user", verifyUser);
authRouter.get("/verify-admin", verifyUser);
authRouter.post("/login-user", loginUser);
authRouter.post("/login-admin", loginUser);

export default authRouter;