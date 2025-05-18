import express from "express"
import { Authenticate } from "../middleware/Authenticate";
import { CreateEvents, getEvent, GetOdds, ListEvent, ResolveOutcome } from "../controller/event";

const router = express.Router();


router.post("/", Authenticate, CreateEvents);
router.post("/:id/resolve", Authenticate, ResolveOutcome);

router.get("/", Authenticate, ListEvent)
router.get("/:id", Authenticate, getEvent)
router.get("/:id/odds", Authenticate, GetOdds);
export default router;