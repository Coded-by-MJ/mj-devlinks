"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const cookieHandler = (0, asyncHandler_1.default)(async (req, res, next) => {
    const userId = req.cookies?.userId;
    if (!userId) {
        res.status(401);
        throw new Error("UserId not found in cookies");
    }
    next();
});
exports.default = cookieHandler;
