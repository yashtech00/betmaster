import express from "express"
import { GetMe, Login, Logout, Signup } from "../controller/Auth";
import { Authenticate } from "../middleware/Authenticate";
import { PlaceTrade } from "../controller/event";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/logout", Logout);
router.get("/me", Authenticate, GetMe);
router.post("/:id", Authenticate, PlaceTrade);


export default router;