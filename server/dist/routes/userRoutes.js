"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersControllers_1 = require("../controllers/usersControllers");
const cookieHandler_1 = __importDefault(require("../middleware/cookieHandler"));
const router = express_1.default.Router();
router.post("/sign-up", usersControllers_1.createUserInDB);
router.post("/login", usersControllers_1.loginUser);
router.post("/reset", usersControllers_1.resetUserPassword);
router.get("/:id", usersControllers_1.getUserFromDB);
router.put("/", cookieHandler_1.default, usersControllers_1.updateUserInDB);
router.post("/social-links", cookieHandler_1.default, usersControllers_1.updateUserSocialLinksInDB);
exports.default = router;
