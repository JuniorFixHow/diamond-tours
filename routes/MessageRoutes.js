import { Router } from "express";
import {
  deleteByAdmin,
  deleteMessage,
  fetchAll,
  fetchMany,
  fetchSingle,
  sendManyEmail,
  sendOneEmail,
} from "../controllers/MessageController.js";
const router = Router();

router.post("/one", sendOneEmail);
router.post("/many", sendManyEmail);
router.get("/many", fetchMany);
router.get("/one", fetchSingle);
router.get("/", fetchAll);
router.delete("/:id", deleteMessage);
router.post("/admin/:id", deleteByAdmin);

export default router;
