import { Router } from "express";
import { sendManyEmail, sendOneEmail } from "../controllers/MessageController.js";
const router = Router();

router.post('/one', sendOneEmail);
router.post('/many', sendManyEmail);

export default router;