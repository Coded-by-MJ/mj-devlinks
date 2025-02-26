"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const cookieHandler = (0, asyncHandler_1.default)(async (req, res, next) => {
    var _a;
    const userId = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        res.status(401);
        throw new Error("UserId not found in cookies");
    }
    next();
});
exports.default = cookieHandler;
