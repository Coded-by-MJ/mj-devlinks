import * as express from "express";
import {
  getUserFromDB,
  updateUserInDB,
  updateUserSocialLinksInDB,
  createUserInDB,
  loginUser,
  resetUserPassword,
} from "../controllers/usersControllers";
import cookieHandler from "../middleware/cookieHandler";
const router = express.Router();

router.post("/sign-up", createUserInDB);
router.post("/login", loginUser);
router.post("/reset", resetUserPassword);

router.get("/:id", getUserFromDB);
router.put("/", cookieHandler, updateUserInDB);
router.post("/social-links", cookieHandler, updateUserSocialLinksInDB);

export default router;
