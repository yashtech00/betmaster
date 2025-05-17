"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authenticate_1 = require("../middleware/Authenticate");
const event_1 = require("../controller/event");
const router = express_1.default.Router();
router.post("/", Authenticate_1.Authenticate, event_1.CreateEvents);
router.post("/:id/resolve", Authenticate_1.Authenticate, event_1.ResolveOutcome);
router.get("/", Authenticate_1.Authenticate, event_1.ListEvent);
router.get("/:id", Authenticate_1.Authenticate, event_1.getEvent);
router.get("/:id/odds", Authenticate_1.Authenticate, event_1.GetOdds);
exports.default = router;
