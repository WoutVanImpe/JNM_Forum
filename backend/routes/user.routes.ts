import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.get("/search/channel/:channelId", userController.searchInChannel);

export default router;
