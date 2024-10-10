"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./utils/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
    app.use((0, morgan_1.default)("dev"));
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("<h1>Hello From Server...</h1>");
});
//Create Actions
app.post("/user", async (req, res) => {
    const { userId, email } = req.body;
    try {
        const user = await db_1.default.user.create({
            data: {
                clerk_id: userId,
                email,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
});
// Read Actions
app.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await db_1.default.user.findUnique({
            where: {
                clerk_id: userId,
            },
            include: {
                socialLinks: true,
            },
        });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});
// Update Actions
app.put("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, image } = req.body;
    try {
        const user = await db_1.default.user.update({
            where: {
                clerk_id: userId,
            },
            data: {
                firstName,
                lastName,
                image,
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});
app.put("/user/:userId/social-links", async (req, res) => {
    const { userId } = req.params;
    const { socialLinks } = req.body;
    try {
        await db_1.default.socialLink.deleteMany({
            where: {
                clerk_id: userId,
            },
        });
        const createdLinks = await db_1.default.socialLink.createMany({
            data: socialLinks.map((link) => ({
                url: link.url,
                name: link.name,
                clerk_id: userId,
            })),
        });
        res.status(200).json(createdLinks);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update social links" });
    }
});
app.use((req, res) => {
    res.status(404).json({ error: "Route does not exist" });
});
const startApp = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
startApp();
