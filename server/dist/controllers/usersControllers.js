"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = exports.updateUserSocialLinksInDB = exports.createUserInDB = exports.loginUser = exports.updateUserInDB = exports.getUserFromDB = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const db_1 = __importDefault(require("../utils/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserInDB = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("please include all fields");
    }
    //Find if user already exists
    const userExists = await db_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    //hash password
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    const user = await db_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
        },
        include: {
            socialLinks: true,
        },
    });
    res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        email: user.email,
        socialLinks: user.socialLinks,
        token: generateToken(user.id),
    });
});
exports.createUserInDB = createUserInDB;
const resetUserPassword = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("please include all fields");
    }
    //Find if user already exists
    const userExists = await db_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!userExists) {
        res.status(400);
        throw new Error("No account associated with this email, please sign-up");
    }
    //hash password
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    const user = await db_1.default.user.update({
        where: {
            email,
        },
        data: {
            password: hashedPassword,
        },
        include: {
            socialLinks: true,
        },
    });
    res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        email: user.email,
        socialLinks: user.socialLinks,
        token: generateToken(user.id),
    });
});
exports.resetUserPassword = resetUserPassword;
const loginUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await db_1.default.user.findUnique({
        where: {
            email,
        },
        include: {
            socialLinks: true,
        },
    });
    if (user && (await bcrypt_1.default.compare(password, user.password))) {
        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image,
            email: user.email,
            socialLinks: user.socialLinks,
            token: generateToken(user.id),
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});
exports.loginUser = loginUser;
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ id }, secret, {
        expiresIn: "30d",
    });
};
const getUserFromDB = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.params.id;
    const user = await db_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            lastName: true,
            firstName: true,
            email: true,
            image: true,
            socialLinks: true,
        },
    });
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404);
        throw new Error("User not found in Database");
    }
});
exports.getUserFromDB = getUserFromDB;
const updateUserInDB = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.cookies.userId;
    const { firstName, lastName, image } = req.body;
    const user = await db_1.default.user.update({
        where: {
            id: userId,
        },
        data: {
            firstName,
            lastName,
            image,
        },
    });
    res.status(200).json(user);
});
exports.updateUserInDB = updateUserInDB;
const updateUserSocialLinksInDB = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.cookies.userId;
    const { socialLinks } = req.body;
    await db_1.default.socialLink.deleteMany({
        where: {
            userId,
        },
    });
    const newSocialLinks = await db_1.default.socialLink.createMany({
        data: socialLinks.map((link) => ({
            url: link.url,
            name: link.name,
            userId,
        })),
    });
    res.status(201).json(newSocialLinks);
});
exports.updateUserSocialLinksInDB = updateUserSocialLinksInDB;
