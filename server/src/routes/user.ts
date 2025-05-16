import express from "express"
import { getMe, Login, Logout, Signup } from "../controller/Auth";
import { Authenticate } from "../middleware/Authenticate";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/logout", Logout);
router.get("/me", Authenticate, getMe);

