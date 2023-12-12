import { Router } from "express";
import { loginAdmin, loginUser, registerAdmin, registerUser, verifyAdmin, verifyUser } from "../../controllers/auth";
const authRouter = Router();

authRouter.post("/register-user", registerUser);
authRouter.post("/register-admin", registerAdmin);
authRouter.put("/verify-user", verifyUser);
authRouter.put("/verify-admin", verifyAdmin);
authRouter.post("/login-user", loginUser);
authRouter.post("/login-admin", loginAdmin);

export default authRouter;