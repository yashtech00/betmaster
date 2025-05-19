"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controller/Auth");
const Authenticate_1 = require("../middleware/Authenticate");
const event_1 = require("../controller/event");
const router = express_1.default.Router();
router.post("/login", Auth_1.Login);
router.post("/signup", Auth_1.Signup);
router.post("/logout", Auth_1.Logout);
router.get("/me", Authenticate_1.Authenticate, Auth_1.GetMe);
router.post("/:id", Authenticate_1.Authenticate, event_1.PlaceTrade);
exports.default = router;
